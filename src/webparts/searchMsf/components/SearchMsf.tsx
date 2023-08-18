import * as React from 'react';
import { useState } from 'react';
import styles from './SearchMsf.module.scss';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { ISearchMsfProps } from './ISearchMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default function SearchMsf (props): React.ReactElement  {
    const {
      wrapper_justify,
      wrapper_bg,
      wrapper_br,
    
      input_placeholder,
      input_suffix,
      input_width,
      input_height,
      input_font,
      input_margin,
      input_br,
      input_border,

      dropdown_url,
      dropdown_label,
      dropdown_width,
      dropdown_height,
      dropdown_font,
      dropdown_margin,
      dropdown_br,
      dropdown_border,

      button_label,
      button_blank,
      button_icontoggle,
      button_icon,
      button_width,
      button_height,
      button_borderRadius,
      button_fontsize,
      button_color,
      button_fontcolor,
      button_margin,
    } = props.details;

    const inlineStyles = {
      solution: {
        justifyContent:  `${wrapper_justify}`,
        backgroundColor: `${wrapper_bg}`,
        borderRadius: `${wrapper_br}px`
      },
      input: {
        width:`${input_width}px`,
        height: `${input_height}px`,
        borderRadius:`${input_br}px`,
        fontSize:`${input_font}px`,
        border: `${input_border}`,
        margin: `0 ${input_margin}px`,
      },
      dropdown: {
        width:`${dropdown_width}px`,
        height: `${Number(dropdown_height)+6}px`,
        lineHeight: `${Number(dropdown_height)+6}px`,
        borderRadius:`${dropdown_br}px`,
        fontSize:`${dropdown_font}px`,
        border: `${dropdown_border}`,
        margin: `0 ${dropdown_margin}px`,
      },
      button: {
        display: "flex",
        alignItems: "center",
        justifyContent: `${button_icontoggle === false || button_label === "" ? "center" : "start"}`,
        width: `${button_width}px`,
        height: `${button_height}px`,
        fontSize: `${ button_fontsize}px`,
        borderRadius: `${button_borderRadius}px`,
        margin: `0 ${button_margin}px`,
        color: `${button_fontcolor}`,
        backgroundColor: `${button_color}`,
      }
    }
    const options_url = dropdown_url === undefined? [] : dropdown_url.split(";")
    const options_labels = dropdown_label === undefined? [] : dropdown_label.split(";")

    const[searchWord,setSearchWord] = useState("")
    const setSearchWordHandler = (e) => {
     setSearchWord(e.target.value)
    }

    const [selectedUrl, setSelectedUrl] = useState(options_url[0]); 
    const selectedUrlHandler = (e) => {

      setSelectedUrl(e.target.value)
    }
   


    const navigation = (e) => {
       e === "Enter" || e.key ==="Enter" ? 
       window.open(`${selectedUrl}${searchWord}${input_suffix === undefined ? "" : input_suffix}`, button_blank ? "_blank" : "_self") : null
     }

    return (
      <div className={styles.searchmsf_wrapper} style={inlineStyles.solution}  onKeyDown={(e)=>{navigation(e)}} tabIndex={-1}>
        <input 
          style={inlineStyles.input}
          type="text"
          onChange={setSearchWordHandler}
          value={searchWord}
          placeholder={input_placeholder}
        />
        <select style={inlineStyles.dropdown} value={selectedUrl} onChange={selectedUrlHandler}>
          {options_url.map((url,idx) => (
            idx === 0 ? 
            <option value={url} selected>{options_labels[idx]}</option> :
            <option value={url}>{options_labels[idx]}</option> 
          ))}
        </select>
        <button style={inlineStyles.button} onClick={()=>{navigation("Enter")}}>
          {button_icontoggle === false ? null : <FontIcon aria-label={button_icon} iconName={button_icon} style={{margin:"0 3px"}}/>}
          {button_label}
        </button>
      </div>
    );
  }
