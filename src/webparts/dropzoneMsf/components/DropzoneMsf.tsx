import * as React from 'react';
import {useState, useMemo, CSSProperties, useCallback} from 'react'
import styles from './DropzoneMsf.module.scss';
import {useDropzone} from 'react-dropzone'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { spfi,SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/sites";
import { Web } from "@pnp/sp/webs";

const mime: MimeTypes = require('./mime.json');

export interface ChunkedFileUploadProgressData {
  stage: "starting" | "continue" | "finishing";
  blockNumber: number;
  totalBlocks: number;
  chunkSize: number;
  currentPointer: number;
  fileSize: number;
}

interface dropfile extends File{
  path: string
}

interface MimeTypes {
  [key: string]: string;
}

interface Accept {
  [key: string]: string[];
}

export default function DropzoneMsf (props) {
  
  const context = props.context

  //General
  const instructions = props.instructions
  const accepted = props.accepted
  const overwrite = props.overwrite
  const externalSite = props.siteToggle

  //visual
  const fontSize = props.fontSize
  const fileProgress = props.fileProgress
  const fileList = props.fileList
  const typeIcons = props.typeIcons


  const sp = spfi().using(SPFx(context));
  const accArr:string[] = accepted === "" || accepted === undefined ? [] : accepted.replaceAll(" ","").split(',')
 
  //STYLES//
    const baseStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#919090',
      outline: 'none',
      cursor: 'pointer',
      transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
      borderColor: '#eeeeee'
    };

    const acceptStyle = {
      borderColor: '#00e676'
    };

    const rejectStyle = {
      borderColor: '#ff1744'
    };

    const style_instruction = {
      fontSize: `${fontSize}px`
    }

  let itemObj: Accept = {}
  accArr.forEach( item => {
     itemObj[mime[item]] = [item]
  })

   const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: itemObj,
    onDrop: files => uploadFile(files) 
});

const inputProps = getInputProps({
  onChange: event => {
    const fileList = event.target.files;
    const filesArray = Array.from(fileList);
    uploadFile(filesArray);
  }
});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]) as CSSProperties ;
 
//STYLES END///

     const [state,setState] = useState({
      showProgress: false,
      progressLabel: "",
      progressDescription: "",
      progressPercent: 0
    })

    const [stateStatus, setStateStatus] = useState ('progress')
    
    let chunkSize = 2000000
  
    async function uploadFile (files: any[]) {
         
      if (files.length === 0) {
        setState({
          progressPercent: 0,
          progressDescription: `Wrong file type! Accepted file types: ${accArr}`,
          progressLabel: "",
          showProgress: false
        })
        setStateStatus('fail')
      }

      if(!externalSite){

        const listObj:{id:string, title: string, url:string} = props.listObj === undefined ? {id:"", title: "", url:""} : props.listObj
        const folder = props.folderPath === "" || props.folderPath === undefined ? props.folder : props.folderPath
        const listTitle = listObj.title === "Documents" || listObj.title ==="" ? "Shared Documents" : listObj.title
        const relativePath:string = folder === "" || folder === undefined ? listTitle : `${listTitle}/${folder}`
        try {
          await files.forEach((file,indx) => {
            const fileNamePath = encodeURI(file.name)
            sp.web.getFolderByServerRelativePath(relativePath).files.addChunked(fileNamePath, file, data => {
                let percent = (data.blockNumber / data.totalBlocks)
                setState({
                  progressPercent: percent,
                  progressDescription: "Uploading ... ",
                  progressLabel: "",
                  showProgress: true
                  });
              }, overwrite,
              chunkSize).then(r => {
              setState({
                progressPercent: 100,
                progressDescription: "Succesfully uploaded",
                progressLabel: "",
                showProgress: true
              });
              setStateStatus('success')
            })
            .catch( async e => {
              const err = await e.response.json();     
              setState({
                progressPercent: 0,
                progressDescription: `Upload Failed. ${err['odata.error'].message.value.replaceAll("i:0#.f|membership|","")}`,
                progressLabel: "",
                showProgress: false
              })
              setStateStatus('fail')
            });     
                }, true);       
          } catch (error) {
            alert(error.message)
          }
    } else {
          const eSiteUrl = props.eSiteUrl
          const eLibrary = props.eLibrary
          const eFolder = props.eFolder
          const eListTitle = eLibrary === "Documents" || eLibrary ==="" || eLibrary === undefined ? "Shared Documents" : eLibrary
          const eRelativePath:string = eFolder === undefined || eFolder === "" ? `${eListTitle}` : `${eListTitle}/${eFolder}`

          try {
            await files.forEach( async (file,indx) => {
              const fileNamePath = encodeURI(file.name)
              const w = Web([sp.web, eSiteUrl])
              w.getFolderByServerRelativePath(eRelativePath).files.addChunked(fileNamePath, file, data => {
                  let percent = (data.blockNumber / data.totalBlocks)
                  setState({
                    progressPercent: percent,
                    progressDescription: "Uploading ... ",  //`${isNaN(Math.round(percent * 100)) ? "-" : Math.round(percent * 100)} %`,
                    progressLabel: "",
                    showProgress: true
                    });
                  setStateStatus('progress')
                }, overwrite,
                chunkSize).then(r => {
                setState({
                  progressPercent: 100,
                  progressDescription: "Succesfully uploaded",
                  progressLabel: "",
                  showProgress: true
                });
                setStateStatus('success')
              })
              .catch( async (e) => {
                const err = await e.response.json();
                setState({
                  progressPercent: 0,
                  progressDescription: `Upload Failed. ${err['odata.error'].message.value.replaceAll("i:0#.f|membership|","")}`,
                  progressLabel: "",
                  showProgress: false
                })
                setStateStatus('fail')
              });     
                  }, true);       
            } catch (error) {
              alert(error.message)
            }
    }
  }

  const filesToDisplay = acceptedFiles.map((file: dropfile) => ( 
    <div className={styles.file}>
      <span>{file.path} </span>
      <span className={styles.filesize}>{(file.size/1000000).toFixed(2)} MB</span>
    </div>
  ))

  return (
    <section>
      <div {...getRootProps({style})}>
        <input {...inputProps}/>
        <p style={style_instruction}>{instructions}</p>
        
      {typeIcons ?
        <div className={styles.iconwrapper}>
            {accArr.map( file => <div className={styles.icon}>{file.toUpperCase()}</div>)}
        </div>
        : null}
      </div>
      {fileProgress ? 
            <ProgressIndicator 
            label={state.progressLabel}
            percentComplete={state.progressPercent}
            barHeight={5} 
            styles={{
              progressBar: {
                backgroundColor: '#5878d1'
              }
            }}
            />
            : null }
      {state.progressDescription === "" ? null :
          stateStatus === 'success' ?
            <div className={styles.success}>{state.progressDescription}</div> : 
            stateStatus === 'fail' ?
            <div className={styles.fail}>{state.progressDescription}</div> :  
            <div className={styles.progress}>{state.progressDescription}</div>
        } 
      {fileList ? 
          <div className={styles.file_list}>{filesToDisplay}</div> 
          : null}
    </section>
  );
}
