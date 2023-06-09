import * as React from 'react';
import { useState } from 'react';
import styles from './ButtonMsf.module.scss';
import ButtonDetail from './ButtonDetail'

export default function ButtonMsf (props): React.ReactElement {
    const {
      solutionDirection,
      solutionAlignment,
      solutionJustify,
      solutionBG,
      solutionBorderRadius,

      inputToggle,
      inputOrder,
      inputAlignment,
      inputPlaceholderText,
      inputWidth,
      inputFont,
      inputBorderRadius,
      inputMargin,
      inputBorder,

      dropdownToggle,
      dropdownOrder,
      dropdownAlignment,
      dropdownValues,
      dropdownLabels,
      dropdownWidth,
      dropdownFont,
      dropdownBorderRadius,
      dropdownMargin,
      dropdownBorder,

      buttonsNumber,
      buttonOrder,
      buttonAlignment,
      buttonsDirection,
      link, suffix, label, blank, icon, iconPicker, width, height, borderRadius, color, margin, textColor, textAlignment, textSize,
      link2, suffix2, label2, blank2, icon2, iconPicker2, width2, height2, borderRadius2, color2, margin2, textColor2, textAlignment2, textSize2,
      link3, suffix3, label3, blank3, icon3, iconPicker3, width3, height3, borderRadius3, color3, margin3, textColor3, textAlignment3, textSize3,
      link4, suffix4, label4, blank4, icon4, iconPicker4, width4, height4, borderRadius4, color4, margin4, textColor4, textAlignment4, textSize4,
      link5, suffix5, label5, blank5, icon5, iconPicker5, width5, height5, borderRadius5, color5, margin5, textColor5, textAlignment5, textSize5,
      link6, suffix6, label6, blank6, icon6, iconPicker6, width6, height6, borderRadius6, color6, margin6, textColor6, textAlignment6, textSize6,
      link7, suffix7, label7, blank7, icon7, iconPicker7, width7, height7, borderRadius7, color7, margin7, textColor7, textAlignment7, textSize7,
      link8, suffix8, label8, blank8, icon8, iconPicker8, width8, height8, borderRadius8, color8, margin8, textColor8, textAlignment8, textSize8,
      link9, suffix9, label9, blank9, icon9, iconPicker9, width9, height9, borderRadius9, color9, margin9, textColor9, textAlignment9, textSize9,
      link10, suffix10, label10, blank10, icon10, iconPicker10, width10, height10, borderRadius10, margin10, color10, textColor10, textAlignment10, textSize10
    } = props.details;

   const details_1 = [link, suffix, label, blank, icon, iconPicker, width, height, borderRadius, color, margin, textColor, textAlignment, textSize]
   const details_2 = [link2, suffix2, label2, blank2, icon2, iconPicker2, width2, height2, borderRadius2, color2, margin2, textColor2, textAlignment2, textSize2]
   const details_3 = [link3, suffix3, label3, blank3, icon3, iconPicker3, width3, height3, borderRadius3, color3, margin3, textColor3, textAlignment3, textSize3]
   const details_4 = [link4, suffix4, label4, blank4, icon4, iconPicker4, width4, height4, borderRadius4, color4, margin4, textColor4, textAlignment4, textSize4]
   const details_5 = [link5, suffix5, label5, blank5, icon5, iconPicker5, width5, height5, borderRadius5, color5, margin5, textColor5, textAlignment5, textSize5]
   const details_6 = [link6, suffix6, label6, blank6, icon6, iconPicker6, width6, height6, borderRadius6, color6, margin6, textColor6, textAlignment6, textSize6]
   const details_7 = [link7, suffix7, label7, blank7, icon7, iconPicker7, width7, height7, borderRadius7, color7, margin7, textColor7, textAlignment7, textSize7]
   const details_8 = [link8, suffix8, label8, blank8, icon8, iconPicker8, width8, height8, borderRadius8, color8, margin8, textColor8, textAlignment8, textSize8]
   const details_9 = [link9, suffix9, label9, blank9, icon9, iconPicker9, width9, height9, borderRadius9, color9, margin9, textColor9, textAlignment9, textSize9]
   const details_10 = [link10, suffix10, label10, blank10, icon10, iconPicker10, width10, height10, borderRadius10, color10, margin10, textColor10, textAlignment10, textSize10]

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
    wrapperDirection = styles.ButtonMsfWrapperHorizontal
    if (buttonAlignment==="start") {
      wrapperAlignment = styles.ButtonMsfWrapperLeft
     }
     else if (buttonAlignment==="center") {
      wrapperAlignment = styles.ButtonMsfWrapperCenter
     }
     else if (buttonAlignment==="end") {
      wrapperAlignment = styles.ButtonMsfWrapperRight
     }
   } else {
    wrapperDirection = styles.ButtonMsfWrapperVertical
    if (buttonAlignment==="start") {
      wrapperAlignment = styles.ButtonMsfWrapperLeftV
     }
     else if (buttonAlignment==="center") {
      wrapperAlignment = styles.ButtonMsfWrapperCenterV
     }
     else if (buttonAlignment==="end") {
      wrapperAlignment = styles.ButtonMsfWrapperRightV
     }
   }
    
   const[searchTerm,setSearchTerm] = useState("")
   const setSearchTermHandler = (event) => {
    setSearchTerm(event.target.value)
   }

  const inlineStyles = {
    solution: {
      flexDirection: solutionDirection,
      justifyContent:  `${solutionAlignment}`,
      alignItems: `${solutionJustify}`,
      backgroundColor: `${solutionBG}`,
      borderRadius: `${solutionBorderRadius}px`
    },
    input: {
      width:`${inputWidth}px`,
      borderRadius:`${inputBorderRadius}px`,
      fontSize:`${inputFont}px`,
      border: `${inputBorder}`,
      margin: `${inputMargin}`,
    },
    input_alignment: {
      justifyContent: `${inputAlignment}`
    },
    dropdown: {
      width:`${dropdownWidth}px`,
      borderRadius:`${dropdownBorderRadius}px`,
      fontSize:`${dropdownFont}px`,
      border: `${dropdownBorder}`,
      margin: `${dropdownMargin}`
    },
    dropdown_alignment: {
      justifyContent: `${dropdownAlignment}`
    }
  }

   let dropdownValues_arr
   let dropdownLabels_arr

   if (dropdownValues !== undefined ) {
    dropdownValues_arr = dropdownValues.split(",")
   }
  
   if ( dropdownLabels !== undefined ) {
    dropdownLabels_arr = dropdownLabels.split(",")
   }

   const [dropdownValue, setDropdownValue] = useState('');
   const dropdownHandler = (event) => {
        setDropdownValue(event.target.value);
     };

    const order = [inputOrder,dropdownOrder,buttonOrder]

    return (
      <div className={styles.solutionWrapper} style={inlineStyles.solution}>
      {inputToggle === false || inputToggle === undefined ? null : (<div className={styles.InputWrapper}  style={inlineStyles.input_alignment}>
        <input 
        style={inlineStyles.input}
        type="text"
        onChange={setSearchTermHandler}
        value={searchTerm}
        placeholder={inputPlaceholderText}
        />
      </div>)}
      {dropdownToggle === false || dropdownToggle === undefined ? null : 
      <div className={styles.InputWrapper} style={inlineStyles.dropdown_alignment}>
        <select className={styles.InputWrapper}value={dropdownValue} onChange={dropdownHandler} style={inlineStyles.dropdown}>
         <option value="" disabled selected>Select option</option>
          {typeof dropdownValues_arr !== 'undefined' && dropdownValues_arr.length > 0 ? dropdownValues_arr.map((e , i ) => {
            return i === 0 ? <option value={e} disabled selected>{dropdownLabels_arr[i]}</option> : <option value={e} >{dropdownLabels_arr[i]}</option>
          }): null}
        </select>
      </div>}
      <div className={`${styles.ButtonMsfWrapper} ${wrapperAlignment} ${wrapperDirection}`}>
        <ButtonDetail details={detailsArr1} search={inputToggle === false? "" : searchTerm} dropdown={dropdownToggle === false? "" : dropdownValue} order={order}/>
        {buttonsNumber > 1 ? <ButtonDetail details={detailsArr2} search={inputToggle === false ?  "" : searchTerm}/> : ""}
        {buttonsNumber > 2 ? <ButtonDetail details={detailsArr3} search={inputToggle === false ?  "" : searchTerm}/> : ""}
        {buttonsNumber > 3 ? <ButtonDetail details={detailsArr4} search={inputToggle === false ? "" : searchTerm}/> : ""}
        {buttonsNumber > 4 ? <ButtonDetail details={detailsArr5} search={inputToggle === false ? "" : searchTerm}/> : ""}
        {buttonsNumber > 5 ? <ButtonDetail details={detailsArr6} search={inputToggle === false ? "" : searchTerm}/> : ""}
        {buttonsNumber > 6 ? <ButtonDetail details={detailsArr7} search={inputToggle === false ? "" : searchTerm}/> : ""}
        {buttonsNumber > 7 ? <ButtonDetail details={detailsArr8} search={inputToggle === false ? "" : searchTerm}/> : ""}
        {buttonsNumber > 8 ? <ButtonDetail details={detailsArr9} search={inputToggle === false ? "" : searchTerm}/> : ""}
        {buttonsNumber > 9 ? <ButtonDetail details={detailsArr10} search={inputToggle === false ? "" : searchTerm}/> : ""}
      </div>
      </div>
    );
}
