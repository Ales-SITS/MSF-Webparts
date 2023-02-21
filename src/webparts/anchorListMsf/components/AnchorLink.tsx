import * as React from 'react';
import styles from './AnchorListMsf.module.scss';

export default function AnchorLink (props:any) {

 return (
      <a className={styles.anchorLink} href={props.link} style={props.linkStyle}>
        <span className={styles.symbol}>{props.symbol === "none" ? "" : props.symbol} {props.title}</span>      
      </a>
   
 )
} 