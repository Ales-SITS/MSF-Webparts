import * as React from 'react';
import styles from './ButtonMsf.module.scss';
import { IButtonMsfProps } from '../ButtonMsfWebPart';
import ButtonMsfButton from './ButtonDetail'

export default class ButtonMsf extends React.Component<IButtonMsfProps, {}> {

  public render(): React.ReactElement<IButtonMsfProps> {
    const {
      buttonsNumber,
      buttonAlignment,
      buttonsDirection,
      link, label, blank, icon, iconPicker, width, height, borderRadius, color, textColor, textAlignment, textSize,
      link2, label2, blank2, icon2, iconPicker2, width2, height2, borderRadius2, color2, textColor2, textAlignment2, textSize2,
      link3, label3, blank3, icon3, iconPicker3, width3, height3, borderRadius3, color3, textColor3, textAlignment3, textSize3,
      link4, label4, blank4, icon4, iconPicker4, width4, height4, borderRadius4, color4, textColor4, textAlignment4, textSize4,
      link5, label5, blank5, icon5, iconPicker5, width5, height5, borderRadius5, color5, textColor5, textAlignment5, textSize5,
      link6, label6, blank6, icon6, iconPicker6, width6, height6, borderRadius6, color6, textColor6, textAlignment6, textSize6,
      link7, label7, blank7, icon7, iconPicker7, width7, height7, borderRadius7, color7, textColor7, textAlignment7, textSize7,
      link8, label8, blank8, icon8, iconPicker8, width8, height8, borderRadius8, color8, textColor8, textAlignment8, textSize8,
      link9, label9, blank9, icon9, iconPicker9, width9, height9, borderRadius9, color9, textColor9, textAlignment9, textSize9,
      link10, label10, blank10, icon10, iconPicker10, width10, height10, borderRadius10, color10, textColor10, textAlignment10, textSize10
    } = this.props;

   const details_1 = [link, label, blank, icon, iconPicker, width, height, borderRadius, color, textColor, textAlignment, textSize]
   const details_2 = [link2, label2, blank2, icon2, iconPicker2, width2, height2, borderRadius2, color2, textColor2, textAlignment2, textSize2]
   const details_3 = [link3, label3, blank3, icon3, iconPicker3, width3, height3, borderRadius3, color3, textColor3, textAlignment3, textSize3]
   const details_4 = [link4, label4, blank4, icon4, iconPicker4, width4, height4, borderRadius4, color4, textColor4, textAlignment4, textSize4]
   const details_5 = [link5, label5, blank5, icon5, iconPicker5, width5, height5, borderRadius5, color5, textColor5, textAlignment5, textSize5]
   const details_6 = [link6, label6, blank6, icon6, iconPicker6, width6, height6, borderRadius6, color6, textColor6, textAlignment6, textSize6]
   const details_7 = [link7, label7, blank7, icon7, iconPicker7, width7, height7, borderRadius7, color7, textColor7, textAlignment7, textSize7]
   const details_8 = [link8, label8, blank8, icon8, iconPicker8, width8, height8, borderRadius8, color8, textColor8, textAlignment8, textSize8]
   const details_9 = [link9, label9, blank9, icon9, iconPicker9, width9, height9, borderRadius9, color9, textColor9, textAlignment9, textSize9]
   const details_10 = [link10, label10, blank10, icon10, iconPicker10, width10, height10, borderRadius10, color10, textColor10, textAlignment10, textSize10]


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

    return (
      <div className={`${styles.ButtonMsfWrapper} ${wrapperAlignment} ${wrapperDirection}`}>
        <ButtonMsfButton details={detailsArr1}/>
        {buttonsNumber > 1 ? <ButtonMsfButton details={detailsArr2}/> : ""}
        {buttonsNumber > 2 ? <ButtonMsfButton details={detailsArr3}/> : ""}
        {buttonsNumber > 3 ? <ButtonMsfButton details={detailsArr4}/> : ""}
        {buttonsNumber > 4 ? <ButtonMsfButton details={detailsArr5}/> : ""}
        {buttonsNumber > 5 ? <ButtonMsfButton details={detailsArr6}/> : ""}
        {buttonsNumber > 6 ? <ButtonMsfButton details={detailsArr7}/> : ""}
        {buttonsNumber > 7 ? <ButtonMsfButton details={detailsArr8}/> : ""}
        {buttonsNumber > 8 ? <ButtonMsfButton details={detailsArr9}/> : ""}
        {buttonsNumber > 9 ? <ButtonMsfButton details={detailsArr10}/> : ""}
      </div>
    );
}
}
