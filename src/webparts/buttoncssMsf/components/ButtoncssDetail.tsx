import * as React from 'react';
import {useState} from 'react';
import styles from './ButtoncssMsf.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { FontIcon } from '@fluentui/react/lib/Icon';

function ButtoncssDetail (props:any) {

  const[
    d_link, d_suffix, d_label, d_blank, d_icon, d_iconPicker, d_css, d_css_hover, d_css_icon, d_css_label
   ] = props.details[0];
  
  const[
    link, suffix, label, blank, icon, iconPicker, css, css_hover, css_icon, css_label
   ] = props.details[1];

   let buttonCSS
   let buttonCSSHover
   let buttonCSSIcon
   let buttonCSSLabel

   d_css === undefined ? "" : css === undefined || css === "" ? buttonCSS = cssfactory(d_css) : buttonCSS = cssfactory(css)
   d_css_hover === undefined ? "" : css_hover === undefined  || css_hover === ""  ? buttonCSSHover = cssfactory(d_css_hover) : buttonCSSHover = cssfactory(css_hover)
   d_css_icon === undefined ? "" : css_icon === undefined || css_icon === "" ? buttonCSSIcon = cssfactory(d_css_icon) : buttonCSSIcon = cssfactory(css_icon)
   d_css_label === undefined ? "" : css_label === undefined || css_label ==="" ? buttonCSSLabel = cssfactory(d_css_label) : buttonCSSLabel = cssfactory(css_label)

   interface CSSObject {
    [key: string]: string;
  }

   function cssfactory (code:string) {
      const cssArr: string[] = code.split(';') 

      const cssObject_raw:CSSObject = cssArr.reduce((acc, curr) => {
        const [property, ...value] = curr.split(':');  //split string on first occurence => property, [value, value]
        const step = value.join(':') // connects value array to value:value, i.e [https,//msfintl.sharepoint] => https://msfintl.sharepoint.com/
        acc [property.trim()] = step.trim();
        return acc;
      },{})
     
     const cssObject = Object.keys(cssObject_raw).reduce((acc, curr) => {
        const camelCasedKey = curr.replace(/-([a-z])/g, (match, group1) => group1.toUpperCase());
        acc[camelCasedKey] = cssObject_raw[curr];
        return acc;
      }, {});
    
 
        return cssObject
   } 

   const searchTerm = props.search

   let searchTermOption 
   if (searchTerm === ""){
     searchTermOption = `${escape(link)}`
   } else {
     searchTermOption = `${escape(link)}${searchTerm}${escape(suffix)}`
   }  

   const url = searchTermOption.includes("amp;")? searchTermOption.replace("amp;","") : searchTermOption

    const [butCSS, setButCSS] = useState(buttonCSS)
    const butCSSHandler = (state) => {
        state === true ? setButCSS(buttonCSS) : setButCSS(buttonCSSHover)
    }

    return (
        <a className={styles.ButtoncssMsfLink} href={url} target={blank ? "_blank":"_self"} rel = {blank? "noreferrer" : ""} data-interception="off" >
          <div className={styles.ButtoncssMsf} style={butCSS}
            onMouseEnter={()=>butCSSHandler(false)}
            onMouseLeave={()=>butCSSHandler(true)}
          >
            {icon===false? "":<FontIcon aria-label={iconPicker} iconName={iconPicker} className={`${styles.iconClass}`} style={buttonCSSIcon}/>}
            {label===undefined || label=== "" ? "":<span className={`${styles.ButtoncssMsfText}`} style={buttonCSSLabel}>{label}</span>}
          </div>
        </a>
    );
}

export default ButtoncssDetail