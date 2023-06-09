import * as React from 'react';
import styles from './ButtonMsf.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { FontIcon } from '@fluentui/react/lib/Icon';

function ButtonDetail (props:any): React.ReactElement {

  const[
    d_link, d_suffix, d_label, d_blank, d_icon, d_iconPicker, d_width, d_height, d_borderRadius, d_color, d_margin, d_textColor, d_textAlignment, d_textSize
   ] = props.details[0];
  
  const[
    link, suffix, label, blank, icon, iconPicker, width, height, borderRadius, color, margin, textColor, textAlignment, textSize
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

    const searchTerm = props.search
    const dropdown = props.dropdown
    const order = props.order === undefined? [1,2,3] : props.order

    const orderArray = [[order[0],searchTerm],[order[1],dropdown],[order[2],link]]

    let searchTermOption 
    if (searchTerm === ""){
      searchTermOption = `${escape(link)}`
    } else {
      console.log("Confirmed")
      const urlArrOrd =orderArray.sort(function(a, b) {return a[0] - b[0];});
      const urlOrd = `${[urlArrOrd[0][1]]}${[urlArrOrd[1][1]]}${[urlArrOrd[2][1]]}`
      searchTermOption = urlOrd//`${escape(link)}${escape(dropdown)}${searchTerm}${escape(suffix)}`
    }  

     const url = searchTermOption.includes("amp;") ? searchTermOption.replace("amp;","") : searchTermOption
     console.log(url)

    return (
        <a className={styles.ButtonMsfLink} href={url} target={blank ? "_blank":"_self"} rel = {blank? "noreferrer" : ""} data-interception="off" >
          <div className={styles.ButtonMsf} style={inlineStyles.container}>
            {icon===false? "":<FontIcon aria-label={iconPicker} iconName={iconPicker} className={`${styles.iconClass}`} style={{fontSize:`${textSize===undefined || textSize==='' ? d_textSize : textSize}px`}}/>}
            {label===undefined || label=== "" ? "":<span className={`${styles.ButtonMsfText}`} style={{fontSize:`${textSize===undefined || textSize==='' ? d_textSize : textSize}px`}}>{label}</span>}
          </div>
        </a>
    );
}

export default ButtonDetail