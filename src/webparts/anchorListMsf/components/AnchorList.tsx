import * as React from 'react';
import { useState, useEffect } from 'react';
import  AnchorLink from './AnchorLink'
import styles from './AnchorListMsf.module.scss';


interface anchorObj {
    link:string;
    title:string
  } 

interface inlineStylesObj {
  anchorListBoxInline: Object;
  anchorAlignment: Object;
  headerInline: Object;
  linkInline: Object
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
        AnchorListSymbol,
        ListAlignment,
        TextAlignment,
        BorderRadius,
        ListBG,
        ListColor,
        HeaderBG,
        HeaderColor,
        Line,
      } = props.details;
      

    const inlineStyles: inlineStylesObj = {
        anchorAlignment:{
          alignItems: `${ListAlignment}`,
        },
        anchorListBoxInline: {
          alignItems:`${TextAlignment}`,
          borderRadius:`${BorderRadius===undefined || BorderRadius==='' ? "0" : BorderRadius}px`,
          backgroundColor: `${ListBG===undefined || ListBG==='' ? "" : ListBG}`,
          color: `${ListColor===undefined || ListColor==='' ? "" : ListColor}`,
        },
        headerInline: {
          justifyContent:`${TextAlignment}`,
          backgroundColor: `${HeaderBG===undefined || HeaderBG==='' ? "" : HeaderBG}`,
          color: `${HeaderColor===undefined || HeaderColor==='' ? "" : HeaderColor}`,
          borderBottom: `${Line===undefined || Line==='' ? "" : Line}`
        },
        linkInline: {
          justifyContent:`${TextAlignment}`,
          backgroundColor: `${ListBG===undefined || ListBG==='' ? "" : ListBG}`,
          color: `${ListColor===undefined || ListColor==='' ? "" : ListColor}`,
        }
       }


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
  <div className={styles.anchorListWrapper} style={inlineStyles.anchorAlignment}>
    <div className={styles.anchorListBox} style={inlineStyles.anchorListBoxInline}>
      <div onClick={setAnchorHandler} className={styles.header} style={inlineStyles.headerInline}>
        <span>{AnchorListTitle}</span>
      </div>
      <div className={styles.anchorLinksWrapper}>
        {anchorlink.map(item =>  <AnchorLink symbol={AnchorListSymbol} link={item.link} title={item.title} linkStyle={inlineStyles.linkInline}/>)}
      </div>      
    </div>
  </div>
 )
} 