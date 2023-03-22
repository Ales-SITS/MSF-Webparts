import * as React from 'react';
import styles from './DropzoneMsf.module.scss';
import { IDropzoneMsfProps } from './IDropzoneMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Log,UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { DropzoneComponentProps, DropzoneComponent, DropzoneComponentHandlers } from "react-dropzone-component";
import pnp,{Web} from 'sp-pnp-js';
export default class DropzoneMsf extends React.Component<IDropzoneMsfProps, {}> {
  constructor(props: IDropzoneMsfProps){
    super(props);  
  }
  public render(): React.ReactElement<IDropzoneMsfProps> {
    let _message = this.props.message
    let _context = this.props.context;
    let _listName = this.props.listName;
    let _folderName = this.props.folderName;
    let _fileTypes = this.props.fileTypes;
    let _DropzoneMsfTo= "DocumentLibrary" //this.props.uploadFilesTo;
    let _queryStringParam = this.props.queryString;
    let queryParameters = new UrlQueryParameterCollection(window.location.href);
    let _itemId = queryParameters.getValue(_queryStringParam);
    let _parent = this;
    
    let componentConfig = {
      iconFiletypes: this.props.fileTypes.split(','),
      showFiletypeIcon: true,
      postUrl: _context.pageContext.web.absoluteUrl
    };

    console.log(_folderName)
    console.log(_folderName==="")
    
    let myDropzone;
    let eventHandlers:DropzoneComponentHandlers = {
      // This one receives the dropzone object as the first parameter
      // and can be used to additional work with the dropzone.js
      // object
    
      init: function(dz){  
      console.log(dz)     
       myDropzone=dz;
      },

      removedfile: function(file){
        let web:Web=new Web(_context.pageContext.web.absoluteUrl); 
        web.lists.getById(_listName).rootFolder.files.getByName(file.name).delete().then(t=>{
            //add your code here if you want to do more after deleting the file
        });          
      },
      processing: function (file) {
        console.log("***PROCESSING***")
      
        if (_fileTypes.includes(file.upload.filename.split('.').pop())){  
          if (_folderName=== "") {
            myDropzone.options.url = `${_context.pageContext.web.absoluteUrl}/_api/web/Lists/getById('${_parent.props.listName}')/rootfolder/files/add(overwrite=true,url='${file.name}')`;  
          } else {
            myDropzone.options.url = `${_context.pageContext.web.absoluteUrl}/_api/web/Lists/getById('${_parent.props.listName}')/rootfolder/folders('${_folderName}')/files/add(overwrite=true,url='${file.name}')`;  
          }  
        } else {
          alert(`Cannot upload '${file.name}'. File has to be one of these formats: ${_fileTypes}.`);
          
        }
        
        },

      sending: function (file, xhr) {
        console.log("***SENDING***")      
          let _send = xhr.send;
          xhr.send = function () {
            _send.call(xhr, file);
          }; 
      },
      error:function(file,error){
        alert(`Cannot upload '${file.name}'. Refresh and try again.`);
      }
     };

    var djsConfig = {
      headers: {
        "X-RequestDigest": this.props.digest
      },
      addRemoveLinks:true,
      createImageThumbnails:true
    };

    return (
      <DropzoneComponent eventHandlers={eventHandlers} djsConfig={djsConfig} config={componentConfig}>
        <div className="dz-message">{_message}</div> 
      </DropzoneComponent>
    );
  }
}
