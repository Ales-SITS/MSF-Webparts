import * as React from 'react';
import {useState} from 'react'
import styles from './DropzoneMsf.module.scss';
import { IDropzoneMsfProps } from './IDropzoneMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {useCallback, useMemo, CSSProperties} from 'react'
import {useDropzone} from 'react-dropzone'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { spfi,SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";

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
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


export default function DropzoneMsf (props) {

  const listObj:{id:string, title: string, url:string} = props.listObj === undefined ? {id:"", title: "", url:""} : props.listObj
  const listTitle = listObj.title === "Documents" || listObj.title ==="" ? "Shared Documents" : listObj.title
  const instructions = props.instructions
  const context = props.context
  const folder = props.folder
  const sp = spfi().using(SPFx(context));

  const realtivePath:string = folder === "" || folder === undefined ? listTitle : `${listTitle}/${folder}`
 
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    /*
    accept: {
    'image/*': [],
    'text/*': []
    },
    */
    onDrop: files => uploadFile(files)
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
 
  
    const [test, setTest] = useState()
    const testHandler = (f) => {
      console.log(f)
    }

    const filesToDisplay = acceptedFiles.map((file: dropfile) => (  
          <span>
            {test} {file.path} - {(file.size/1000000).toFixed(2)} MB
          </span>
    ))



    const [state,setState] = useState({
      showProgress: false,
      progressLabel: "",
      progressDescription: "",
      progressPercent: 0
    })

    let chunkSize = 5000000
    async function uploadFile (files:any[]) {
      testHandler(files)
      try {
        await files.forEach((file,indx) => {
          const fileNamePath = encodeURI(file.name);
          sp.web.getFolderByServerRelativePath(realtivePath).files.addChunked(fileNamePath, file, data => {
            let percent = (data.blockNumber / data.totalBlocks)
            setState({
              progressPercent: percent,
              progressDescription: `${Math.round(percent * 100)} %`,
              progressLabel: "",
              showProgress: true
              });
          }, true,
          chunkSize).then(r => {
          setState({
            progressPercent: 0,
            progressDescription: "Succesfully uploaded",
            progressLabel: "",
            showProgress: false
          });
          //setTest("✔")
        })
        .catch(e => {
          console.log("Error while uploading file");
          console.log(e);
        });     
            }, true);       
      } catch (error) {
        alert(error.message)
      } 
  }


  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{instructions}</p>
      </div>
      <ProgressIndicator
          label={state.progressLabel}
          description={state.progressDescription}
          percentComplete={state.progressPercent}
          barHeight={5} />
      <div className={styles.file_list}>{filesToDisplay}</div>
    </section>
  );
}
