import * as React from 'react';
import styles from './ButtonMsf.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { FontIcon } from '@fluentui/react/lib/Icon';

function ButtonDetail (props:any) {

  const[
    d_link, d_label, d_blank, d_icon, d_iconPicker, d_width, d_height, d_borderRadius, d_color, d_margin, d_textColor, d_textAlignment, d_textSize
   ] = props.details[0];
  
  const[
    link, label, blank, icon, iconPicker, width, height, borderRadius, color, margin, textColor, textAlignment, textSize
   ] = props.details[1];

   
   const inlineStyles:any = {
    container: {
      margin: `${margin===undefined || margin==='' ? d_margin : margin}`,
      width:`${width===undefined || width==='' ? d_width : width}px`,
      height:`${height===undefined || height==='' ? d_height : height}px`,
      borderRadius:`${borderRadius===undefined || borderRadius==='' ? d_borderRadius : borderRadius}px`,
      backgroundColor:`${color===undefined || color==='' ? d_color : color}`,
      color:`${textColor===undefined || textColor==='' ? d_textColor : textColor}`,
      justifyContent:`${textAlignment===undefined || textAlignment==='' ? d_textAlignment : textAlignment}`,
      textAlign:`${textAlignment===undefined || textAlignment==='' ? d_textAlignment : textAlignment}`,
    }
   }

//console.log(label===undefined || label=== "" ? "Nothing": "Label present")
    const searchTerm = props.search[0]
    const searchOption = props.search[1]

    console.log(searchTerm)
    console.log(searchOption)

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
    // const searchTermOption = searchTerm === "" ? "" : `#${searchTerm}*`
    const url = searchTermOption.replace("amp;","")


    return (
        <a className={styles.ButtonMsfLink} href={url} target={blank ? "_blank":"_self"} data-interception="off" >
          <div className={styles.ButtonMsf} style={inlineStyles.container}>
            {icon===false? "":<FontIcon aria-label={iconPicker} iconName={iconPicker} className={`${styles.iconClass}`} style={{fontSize:`${textSize===undefined || textSize==='' ? d_textSize : textSize}px`}}/>}
            {label===undefined || label=== "" ? "":<span className={`${styles.ButtonMsfText}`} style={{fontSize:`${textSize===undefined || textSize==='' ? d_textSize : textSize}px`}}>{label}</span>}
          </div>
        </a>
    );
}

export default ButtonDetail