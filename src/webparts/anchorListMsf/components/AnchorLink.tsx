import * as React from 'react';
import styles from './AnchorListMsf.module.scss';

export default function Anchorlink (props:any) {
 return (
    <div className={`${styles.linksbox}`}>
      <a className={`${styles.links}`} href={props.link}>{props.title} </a>
    </div>
 )
} 