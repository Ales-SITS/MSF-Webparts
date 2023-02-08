import * as React from 'react';
import styles from './AnchorListMsf.module.scss';
import { IAnchorListMsfProps } from './IAnchorListMsfProps';
import Anchorlink from './AnchorLink'

interface anchorObj {
  link:string;
  title:string
}

let anchor: any
let anchorlink: anchorObj[]=[]

let anchorlinkcreator = new Promise (function (resolve,reject){
  console.log("Hi there")
  resolve(
    anchor = document.querySelectorAll('a[data-sp-anchor-id]')
    )
})


const AnchorListMsf : React.FC <IAnchorListMsfProps> = () => {
 
  anchorlink=[]
  anchor.forEach(function(node:any){
      let anchorO: anchorObj={
        link:node.getAttribute("href"),
        title:node.getAttribute("aria-label").replace("Permalink for ","")
      };
        anchorlink.push(anchorO)    
      }
    )
  
  
      return (
        <div>
          <div className={styles.welcome}>
            <span className={`${styles.header}`}>Page Navigation</span>         
                {anchorlink.map(item=> <Anchorlink link={item.link} title={item.title}/>)}         
          </div>
        </div>
      );
  }

export default AnchorListMsf