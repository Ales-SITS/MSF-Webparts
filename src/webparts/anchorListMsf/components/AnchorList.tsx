import * as React from 'react';
import { useState } from 'react';
import styles from './AnchorListMsf.module.scss';


interface anchorObj {
    link:string;
    title:string;
    tag: string
  } 

interface inlineStylesObj {
  anchorListBoxInline: {};
  anchorAlignment: {};
  headerInline: {};
  anchor: {};
  h2anchor: {};
  h2symbol: {};
  h3anchor:{};
  h3symbol:{};
  h4anchor:{};
  h4symbol:{}
}

export default function AnchorList (props:any):JSX.Element {

  let anchorlinks: anchorObj[]=[]
  const anchorInit = document.querySelectorAll('a[data-sp-anchor-id]')

  const {
        AnchorListTitle,
        ListAlignment,
        TextAlignment,
        BorderRadius,
        Border,
        ListBG,
        HeaderBG,
        HeaderColor,
        header_size,
        Line,
        h2_toggle,
        h2_size,
        h2_ind,
        h2_color,
        h2_symbol,
        h2s_color,
        h3_toggle,
        h3_size,
        h3_ind,
        h3_color,
        h3_symbol,
        h3s_color,
        h4_toggle,
        h4_size,
        h4_ind,
        h4_color,
        h4s_color,
        h4_symbol,
        } = props.details;
      
       
    const inlineStyles: inlineStylesObj = {
        anchorAlignment:{
          alignItems: `${ListAlignment}`
        },
        anchorListBoxInline: {
          alignItems:`${TextAlignment}`,
          borderRadius:`${BorderRadius===undefined || BorderRadius==='' ? "0" : BorderRadius}px`,
          backgroundColor: `${ListBG===undefined || ListBG==='' ? "" : ListBG}`,
          border: `${Border===undefined || Border==='' ? "" : Border}`
        },
        headerInline: {
          justifyContent:`${TextAlignment}`,
          backgroundColor: `${HeaderBG===undefined || HeaderBG==='' ? "" : HeaderBG}`,
          color: `${HeaderColor===undefined || HeaderColor==='' ? "" : HeaderColor}`,
          borderBottom: `${Line===undefined || Line==='' ? "" : Line}`,
          fontSize: `${header_size}px`
        },
        anchor: {
          justifyContent:`${TextAlignment}`,
          backgroundColor: `${ListBG===undefined || ListBG==='' ? "" : ListBG}`,
        },
        h2anchor: {
          fontSize: `${h2_size}px`,
          color: `${h2_color === undefined || h2_color ==='' ? "" : h2_color}`,
        },
        h2symbol: {
          marginLeft: `${h2_ind}px`,
          marginRight:'5px',
          color: `${h2s_color}`
        },
        h3anchor: {
          fontSize: `${h3_size}px`,
          color: `${h3_color === undefined || h3_color ==='' ? "" : h3_color}`,
        },
        h3symbol: {
          marginLeft: `${h3_ind}px`,
          marginRight:'5px',
          color: `${h3s_color}`
        },
        h4anchor: {
          fontSize: `${h4_size}px`,
          color: `${h4_color === undefined || h4_color ==='' ? "" : h4_color}`,
        },
        h4symbol: {
          marginLeft: `${h4_ind}px`,
          marginRight:'5px',
          color: `${h4s_color}`
        },
       }


    const [anchor,setAnchor] = useState(anchorInit)
    const setAnchorHandler = ():void => {
        anchorlinks=[]
        setAnchor(document.querySelectorAll('a[data-sp-anchor-id]'))
      }
  

    const visible:string[]=[!h2_toggle? 'H2' : null, !h3_toggle? 'H3' : null, !h4_toggle? 'H4' : null]

    anchor.forEach(function(node:Element){
        const anchorObject: anchorObj={
          link:node.getAttribute("href"),
          title:node.getAttribute("aria-label").replace("Permalink for ",""),
          tag: node.previousElementSibling.tagName
        };
        if (visible.includes(anchorObject.tag)) {
          anchorlinks.push(anchorObject);
        }
        }
      )

 return (
  <div className={styles.anchorListWrapper} style={inlineStyles.anchorAlignment}>
    <div className={styles.anchorListBox} style={inlineStyles.anchorListBoxInline}>
      <div onClick={setAnchorHandler} className={styles.header} style={inlineStyles.headerInline}>
        <span>{AnchorListTitle}</span>
      </div>
      <div className={styles.anchorLinksWrapper}>
        {document.location.href.indexOf('Mode=Edit')!==-1 ? 
        <>
          {!h2_toggle?
          <a className={styles.anchorLink} href="" style={inlineStyles.anchor}>
            <div className={styles.anchorWrapper}>
              <span style={inlineStyles.h2symbol}>{h2_symbol}</span>
              <span style={inlineStyles.h2anchor}>Heading 1</span>      
            </div>
          </a> : null}
          {!h3_toggle?
          <a className={styles.anchorLink} href="" style={inlineStyles.anchor}>
            <div className={styles.anchorWrapper}>
              <span style={inlineStyles.h3symbol}>{h3_symbol}</span>
              <span style={inlineStyles.h3anchor}>Heading 2</span>     
            </div> 
          </a>: null }
          {!h4_toggle? 
          <a className={styles.anchorLink} href="" style={inlineStyles.anchor}>
            <div className={styles.anchorWrapper}>
              <span style={inlineStyles.h4symbol}>{h4_symbol}</span>
              <span style={inlineStyles.h4anchor}>Heading 3</span>   
            </div>
          </a> : null } 
        </>
        : null }
        {anchorlinks.map ((item,index) => 
                  <a key={index} className={styles.anchorLink} href={item.link} style={inlineStyles.anchor}>
                    <div className={styles.anchorWrapper}>
                      <span style={item.tag ==="H2" ? inlineStyles.h2symbol : item.tag === "H3" ? inlineStyles.h3symbol : inlineStyles.h4symbol}>{item.tag === "H2" ?  h2_symbol : item.tag === "H3" ? h3_symbol : h4_symbol}</span>
                      <span style={item.tag ==="H2" ? inlineStyles.h2anchor : item.tag === "H3" ? inlineStyles.h3anchor : inlineStyles.h4anchor}>{item.title}</span>   
                    </div>
                  </a>      
          )}
      </div>      
    </div>
  </div>
 )
} 