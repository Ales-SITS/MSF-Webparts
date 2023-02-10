import * as React from 'react';
import styles from './AnchorListMsf.module.scss';

export default function AnchorLink (props:any) {
 return (
    <div>
      <span className={styles.symbol}>{props.symbol === "none" ? "" : props.symbol}</span>
      <a className={styles.links} href={props.link}>{props.title}</a>
    </div> 
 )
} 