import * as React from 'react';
import { useState, useEffect } from 'react';
import  AnchorLink from './AnchorLink'
import styles from './AnchorListMsf.module.scss';


interface anchorObj {
    link:string;
    title:string
  } 

export default function AnchorList (props:any) {

  let anchorlink: anchorObj[]=[]
  let anchorInit = document.querySelectorAll('a[data-sp-anchor-id]')

   async function anchorlinkcreator(){
      anchorInit = await new Promise ((resolve,reject)=>{resolve(
        anchorInit = document.querySelectorAll('a[data-sp-anchor-id]')
        )})
      return anchorInit
   }

  /* 
  let anchorlinkcreator = new Promise (function (resolve,reject){
    resolve(
      anchorInit = document.querySelectorAll('a[data-sp-anchor-id]')
      )
    })
  */

    const {
        AnchorListTitle,
        AnchorListSymbol
      } = props.details;

      const [anchor,setAnchor] = useState(anchorInit)
      const setAnchorHandler = () => {
        anchorlink=[]
        setAnchor(document.querySelectorAll('a[data-sp-anchor-id]'))
      }
  
      anchor.forEach(function(node:any){
        let anchorObject: anchorObj={
          link:node.getAttribute("href"),
          title:node.getAttribute("aria-label").replace("Permalink for ","")
        };
          anchorlink.push(anchorObject)    
        }
      )

 return (
    <div className={styles.anchorListWrapper}>
      <div onClick={setAnchorHandler} className={styles.header}>{AnchorListTitle}</div>
      <div>
        {anchorlink.map(item =>  <AnchorLink symbol={AnchorListSymbol} link={item.link} title={item.title}/>)}
      </div>      
    </div>
 )
} 