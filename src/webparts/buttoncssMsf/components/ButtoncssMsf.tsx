import * as React from 'react';
import { useState} from 'react';
import styles from './ButtoncssMsf.module.scss';
import ButtoncssDetail from './ButtoncssDetail'

export default function ButtoncssMsf (props) {
    const {
      inputToggle,
      inputAlignment,
      inputPlaceholderText,
      inputWidth,
      inputFont,
      inputBorderRadius,
      inputBorder,
      buttonsNumber,
      buttonAlignment,
      buttonsDirection,
      link, suffix, label, blank, icon, iconPicker, css, css_hover, css_icon, css_label,
      link2, suffix2, label2, blank2, icon2, iconPicker2, css2, css2_hover, css2_icon, css2_label,
      link3, suffix3, label3, blank3, icon3, iconPicker3, css3, css3_hover, css3_icon, css3_label,
      link4, suffix4, label4, blank4, icon4, iconPicker4, css4, css4_hover, css4_icon, css4_label,
      link5, suffix5, label5, blank5, icon5, iconPicker5, css5, css5_hover, css5_icon, css5_label,
      link6, suffix6, label6, blank6, icon6, iconPicker6, css6, css6_hover, css6_icon, css6_label,
      link7, suffix7, label7, blank7, icon7, iconPicker7, css7, css7_hover, css7_icon, css7_label,
      link8, suffix8, label8, blank8, icon8, iconPicker8, css8, css8_hover, css8_icon, css8_label,
      link9, suffix9, label9, blank9, icon9, iconPicker9, css9, css9_hover, css9_icon, css9_label,
      link10, suffix10, label10, blank10, icon10, iconPicker10, css10, css10_hover, css10_icon, css10_label,
    } = props.details;

   const details_1 = [link, suffix, label, blank, icon, iconPicker, css, css_hover, css_icon, css_label]
   const details_2 = [link2, suffix2, label2, blank2, icon2, iconPicker2, css2, css2_hover, css2_icon, css2_label]
   const details_3 = [link3, suffix3, label3, blank3, icon3, iconPicker3, css3, css3_hover, css3_icon, css3_label]
   const details_4 = [link4, suffix4, label4, blank4, icon4, iconPicker4, css4, css4_hover, css4_icon, css4_label]
   const details_5 = [link5, suffix5, label5, blank5, icon5, iconPicker5, css5, css5_hover, css5_icon, css5_label]
   const details_6 = [link6, suffix6, label6, blank6, icon6, iconPicker6, css6, css6_hover, css6_icon, css6_label]
   const details_7 = [link7, suffix7, label7, blank7, icon7, iconPicker7, css7, css7_hover, css7_icon, css7_label]
   const details_8 = [link8, suffix8, label8, blank8, icon8, iconPicker8, css8, css8_hover, css8_icon, css8_label]
   const details_9 = [link9, suffix9, label9, blank9, icon9, iconPicker9, css9, css9_hover, css9_icon, css9_label]
   const details_10 = [link10, suffix10, label10, blank10, icon10, iconPicker10, css10, css10_hover, css10_icon, css10_label]


   const detailsArr1 =[details_1,details_1]
   const detailsArr2 =[details_1,details_2]
   const detailsArr3 =[details_1,details_3]
   const detailsArr4 =[details_1,details_4]
   const detailsArr5 =[details_1,details_5]        
   const detailsArr6 =[details_1,details_6]
   const detailsArr7 =[details_1,details_7]     
   const detailsArr8 =[details_1,details_8]
   const detailsArr9 =[details_1,details_9] 
   const detailsArr10 =[details_1,details_10]    



   let wrapperDirection
   let wrapperAlignment

   if (buttonsDirection === "horizontal") {
    wrapperDirection = styles.ButtoncssMsfWrapperHorizontal
    if (buttonAlignment==="start") {
      wrapperAlignment = styles.ButtoncssMsfWrapperLeft
     }
     else if (buttonAlignment==="center") {
      wrapperAlignment = styles.ButtoncssMsfWrapperCenter
     }
     else if (buttonAlignment==="end") {
      wrapperAlignment = styles.ButtoncssMsfWrapperRight
     }
   } else {
    wrapperDirection = styles.ButtoncssMsfWrapperVertical
    if (buttonAlignment==="start") {
      wrapperAlignment = styles.ButtoncssMsfWrapperLeftV
     }
     else if (buttonAlignment==="center") {
      wrapperAlignment = styles.ButtoncssMsfWrapperCenterV
     }
     else if (buttonAlignment==="end") {
      wrapperAlignment = styles.ButtoncssMsfWrapperRightV
     }
   }
    
   const[searchTerm,setSearchTerm] = useState("")
   const setSearchTermHandler = (event) => {
    setSearchTerm(event.target.value)
   }

  const inputInlineStyles:any = {
    container: {
      width:`${inputWidth}px`,
      borderRadius:`${inputBorderRadius}px`,
      fontSize:`${inputFont}px`,
      border: `${inputBorder}`
    }
   }

   const inputInlineAlignment:any = {
    container: {
      justifyContent: `${inputAlignment}`
    }
   }


    return (
      <>
      {inputToggle === false || inputToggle === undefined ? "" : (<div className={styles.InputWrapper}  style={inputInlineAlignment.container}>
        <input 
        style={inputInlineStyles.container}
        type="text"
        onChange={setSearchTermHandler}
        value={searchTerm}
        placeholder={inputPlaceholderText}
        ></input>
      </div>)}
      <div className={`${styles.ButtoncssMsfWrapper} ${wrapperAlignment} ${wrapperDirection}`}>
        <ButtoncssDetail details={detailsArr1} search={inputToggle === false? "": searchTerm}/>
        {buttonsNumber > 1 ? <ButtoncssDetail details={detailsArr2} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 2 ? <ButtoncssDetail details={detailsArr3} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 3 ? <ButtoncssDetail details={detailsArr4} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 4 ? <ButtoncssDetail details={detailsArr5} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 5 ? <ButtoncssDetail details={detailsArr6} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 6 ? <ButtoncssDetail details={detailsArr7} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 7 ? <ButtoncssDetail details={detailsArr8} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 8 ? <ButtoncssDetail details={detailsArr9} search={inputToggle === false?  "" : searchTerm}/> : ""}
        {buttonsNumber > 9 ? <ButtoncssDetail details={detailsArr10} search={inputToggle === false?  "" : searchTerm}/> : ""}
      </div>
      </>
    );
}
