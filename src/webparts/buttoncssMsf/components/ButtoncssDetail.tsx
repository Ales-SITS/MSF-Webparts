import * as React from 'react';
import {useState} from 'react';
import styles from './ButtoncssMsf.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { FontIcon } from '@fluentui/react/lib/Icon';

function ButtoncssDetail (props:any) {

  const[
    d_link, d_label, d_blank, d_icon, d_iconPicker, d_css, d_css_hover, d_css_icon, d_css_label
   ] = props.details[0];
  
  const[
    link, label, blank, icon, iconPicker, css, css_hover, css_icon, css_label
   ] = props.details[1];

   let buttonCSS
   let buttonCSSHover
   let buttonCSSIcon
   let buttonCSSLabel

   d_css === undefined ? "" : css === undefined || css === "" ? buttonCSS = cssfactory(d_css) : buttonCSS = cssfactory(css)
   d_css_hover === undefined ? "" : css_hover === undefined  || css_hover === ""  ? buttonCSSHover = cssfactory(d_css_hover) : buttonCSSHover = cssfactory(css_hover)
   d_css_icon === undefined ? "" : css_icon === undefined || css_icon === "" ? buttonCSSIcon = cssfactory(d_css_icon) : buttonCSSIcon = cssfactory(css_icon)
   d_css_label === undefined ? "" : css_label === undefined || css_label ==="" ? buttonCSSLabel = cssfactory(d_css_label) : buttonCSSLabel = cssfactory(css_label)


   function cssfactory (code) {
      const cssArr: string[] = code.split(';') 
      const cssObject_raw:any = cssArr.reduce((acc, curr) => {
        const [property, value] = curr.split(':');
        acc [property.trim()] = value.trim();
        return acc;
      },{})

     const cssObject = Object.keys(cssObject_raw).reduce((acc, curr) => {
        const camelCasedKey = curr.replace(/-([a-z])/g, (match, group1) => group1.toUpperCase());
        acc[camelCasedKey] = cssObject_raw[curr];
        return acc;
      }, {});

 
        return cssObject
   } 

    const searchTerm = props.search[0]
    const searchOption = props.search[1]

    let searchTermOption 
    if (searchTerm === ""){
      searchTermOption = `${escape(link)}`
    } else {
        if(searchOption === false){
          searchTermOption = `${escape(link)}${searchTerm}`
        } else if (searchOption === true) {
          searchTermOption = `${escape(link)}#${searchTerm}*`
        }
    }  

    const url = searchTermOption.replace("amp;","")

    const [butCSS, setButCSS] = useState(buttonCSS)
    const butCSSHandler = (state) => {
        state === true ? setButCSS(buttonCSS) : setButCSS(buttonCSSHover)
    }

    return (
        <a className={styles.ButtoncssMsfLink} href={url} target={blank ? "_blank":"_self"} data-interception="off" >
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