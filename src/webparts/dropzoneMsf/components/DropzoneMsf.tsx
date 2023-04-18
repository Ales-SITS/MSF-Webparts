import * as React from 'react';
import styles from './DropzoneMsf.module.scss';
import { IDropzoneMsfProps } from './IDropzoneMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {useCallback, useMemo, CSSProperties} from 'react'
import {useDropzone} from 'react-dropzone'

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
  color: '#bdbdbd',
  outline: 'none',
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
  interface dropfile extends File{
    path: string
  }
  
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'image/*': []}});

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


  //const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map((file: dropfile) => (
      <li key={file.path}>
      {file.path} - {file.size} bytes
      </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{props.instructions}</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
