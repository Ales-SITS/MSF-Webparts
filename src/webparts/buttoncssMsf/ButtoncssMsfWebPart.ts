import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ButtoncssMsfHandler from './components/ButtoncssMsfHandler';
import { PropertyFieldIconPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldIconPicker';


export interface IButtoncssMsfProps {
  inputToggle:boolean;
  inputPnP: boolean;
  inputAlignment: string;
  inputPlaceholderText: string;
  inputWidth: string;
  inputFont: string;
  inputBorderRadius: string;
  inputBorder: string;
  buttonsNumber: number;
  buttonAlignment: string;
  buttonsDirection:string;
  link: string; label: string; blank: boolean; icon: boolean; iconPicker: string; css: string; css_hover: string; css_icon:string; css_label:string
  link2: string; label2: string; blank2: boolean; icon2: boolean; iconPicker2: string; css2: string; css2_hover: string; css2_icon:string; css2_label:string
  link3: string; label3: string; blank3: boolean; icon3: boolean; iconPicker3: string; css3: string; css3_hover: string; css3_icon:string; css3_label:string
  link4: string; label4: string; blank4: boolean; icon4: boolean; iconPicker4: string; css4: string; css4_hover: string; css4_icon:string; css4_label:string
  link5: string; label5: string; blank5: boolean; icon5: boolean; iconPicker5: string; css5: string; css5_hover: string; css5_icon:string; css5_label:string
  link6: string; label6: string; blank6: boolean; icon6: boolean; iconPicker6: string; css6: string; css6_hover: string; css6_icon:string; css6_label:string
  link7: string; label7: string; blank7: boolean; icon7: boolean; iconPicker7: string; css7: string; css7_hover: string; css7_icon:string; css7_label:string
  link8: string; label8: string; blank8: boolean; icon8: boolean; iconPicker8: string; css8: string; css8_hover: string; css8_icon:string; css8_label:string
  link9: string; label9: string; blank9: boolean; icon9: boolean; iconPicker9: string; css9: string; css9_hover: string; css9_icon:string; css9_label:string
  link10: string; label10: string; blank10: boolean; icon10: boolean; iconPicker10: string; css10: string; css10_hover: string; css10_icon:string; css10_label:string
}

export default class ButtoncssMsfWebPart extends BaseClientSideWebPart<IButtoncssMsfProps> {

  
  public render(): void {
    const element: React.ReactElement<IButtoncssMsfProps> = React.createElement(
      ButtoncssMsfHandler,
      {
        inputToggle: this.properties.inputToggle,
        inputPnP: this.properties.inputPnP,
        inputAlignment: this.properties.inputAlignment,
        inputPlaceholderText: this.properties.inputPlaceholderText,
        inputWidth: this.properties.inputWidth,
        inputFont: this.properties.inputFont,
        inputBorderRadius: this.properties.inputBorderRadius,
        inputBorder: this.properties.inputBorder,
        buttonsNumber: this.properties.buttonsNumber,
        buttonAlignment: this.properties.buttonAlignment,
        buttonsDirection:this.properties.buttonsDirection,
        link: this.properties.link, label: this.properties.label, blank: this.properties.blank, icon: this.properties.icon, iconPicker: this.properties.iconPicker, css: this.properties.css, css_hover:this.properties.css_hover, css_icon:this.properties.css_icon, css_label:this.properties.css_label,
        link2: this.properties.link2, label2: this.properties.label2, blank2: this.properties.blank2, icon2: this.properties.icon2, iconPicker2: this.properties.iconPicker2, css2: this.properties.css2, css2_hover:this.properties.css2_hover, css2_icon:this.properties.css2_icon, css2_label:this.properties.css2_label,
        link3: this.properties.link3, label3: this.properties.label3, blank3: this.properties.blank3, icon3: this.properties.icon3, iconPicker3: this.properties.iconPicker3, css3: this.properties.css3, css3_hover:this.properties.css3_hover, css3_icon:this.properties.css3_icon, css3_label:this.properties.css3_label,
        link4: this.properties.link4, label4: this.properties.label4, blank4: this.properties.blank4, icon4: this.properties.icon4, iconPicker4: this.properties.iconPicker4, css4: this.properties.css4, css4_hover:this.properties.css4_hover, css4_icon:this.properties.css4_icon, css4_label:this.properties.css4_label,
        link5: this.properties.link5, label5: this.properties.label5, blank5: this.properties.blank5, icon5: this.properties.icon5, iconPicker5: this.properties.iconPicker5, css5: this.properties.css5, css5_hover:this.properties.css5_hover, css5_icon:this.properties.css5_icon, css5_label:this.properties.css5_label,
        link6: this.properties.link6, label6: this.properties.label6, blank6: this.properties.blank6, icon6: this.properties.icon6, iconPicker6: this.properties.iconPicker6, css6: this.properties.css6, css6_hover:this.properties.css6_hover, css6_icon:this.properties.css6_icon, css6_label:this.properties.css6_label,
        link7: this.properties.link7, label7: this.properties.label7, blank7: this.properties.blank7, icon7: this.properties.icon7, iconPicker7: this.properties.iconPicker7, css7: this.properties.css7, css7_hover:this.properties.css7_hover, css7_icon:this.properties.css7_icon, css7_label:this.properties.css7_label,
        link8: this.properties.link8, label8: this.properties.label8, blank8: this.properties.blank8, icon8: this.properties.icon8, iconPicker8: this.properties.iconPicker8, css8: this.properties.css8, css8_hover:this.properties.css8_hover, css8_icon:this.properties.css8_icon, css8_label:this.properties.css8_label,
        link9: this.properties.link9, label9: this.properties.label9, blank9: this.properties.blank9, icon9: this.properties.icon9, iconPicker9: this.properties.iconPicker9, css9: this.properties.css9, css9_hover:this.properties.css9_hover, css9_icon:this.properties.css9_icon, css9_label:this.properties.css9_label,
        link10: this.properties.link10, label10: this.properties.label10, blank10: this.properties.blank10, icon10: this.properties.icon10, iconPicker10: this.properties.iconPicker10, css10: this.properties.css10, css10_hover:this.properties.css10_hover, css10_icon:this.properties.css10_icon, css10_label:this.properties.css10_label,
      }
    );

    ReactDom.render(element, this.domElement);
  }

 
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    
    const pagesArray = [ 
      {
      header: {
        description: "Welcome! Welcome! On this page (1), you can set number of buttons (up to 10) and their general layout. You can also set all the details for your first button, which visuals works as default for other buttons too. In the next pages (i.e. button 2 = page(2)) you can set other buttons and rewrite the default visual settings for that specific button if needed. You can also use dynamic URL with the optional input field, which value is added automatically to the end of buttons URL (Select PnP Search solution on, if you are using PnP Search webparts). "
      },
      displayGroupsAsAccordion: true,
      groups: [ 
        { 
          groupName: "Input field settings",
          isCollapsed:true,
          groupFields: [
            PropertyPaneToggle('inputToggle',{
              label:"Display connected input field?"
            }),
            PropertyPaneToggle('inputPnP',{
              label:"PnP Search solution?"
            }),
            PropertyPaneChoiceGroup("inputAlignment", {
              label: "Input field alignment",
              options: [
                { key: "start", text: "Start" },
                { key: "center", text: "Center" },
                { key: "end", text: "End" }
              ]
            }),
            PropertyPaneTextField('inputPlaceholderText', {
              label: "Add placeholder text",          
            }),
            PropertyPaneTextField('inputWidth', {
              label: "Set width (px)",
            }),
            PropertyPaneTextField('inputFont', {
              label: "Set font size (px)",
            }),
            PropertyPaneTextField('inputBorderRadius', {
              label: "Set border radius (px)",
            }),
            PropertyPaneTextField('inputBorder', {
              label: "Set border",
              description:"Use CSS format 'size type color' i.e. '2px solid rgb(123,123,13)'"
            }),
          ]
        },          
        { 
          groupName: "General settings",
          isCollapsed:false,
          groupFields: [
            PropertyPaneSlider('buttonsNumber',{  
              label:"Number of buttons",  
              min:1,  
              max:10,  
              value:1,  
              showValue:true,  
              step:1                
            }),
            PropertyPaneChoiceGroup("buttonAlignment", {
              label: "Buttons alignment",
              options: [
                { key: "start", text: "Start" },
                { key: "center", text: "Center" },
                { key: "end", text: "End" }
              ]
            }),
            PropertyPaneChoiceGroup("buttonsDirection", {
              label: "Buttons direction",
              options: [
                { key: "horizontal", text: "Horizontal" },
                { key: "vertical", text: "Vertical" }
              ]
            })
          ]
        },
        {
          groupName: "Button 1 basic settings",
          isCollapsed:false,
          groupFields: [
            PropertyPaneTextField('link', {
              label: "Add URL link",
              multiline: true
            }),
            PropertyPaneTextField('label', {
              label: "Add button label",
              description:"If the label is not properly centered try to ON/OFF the icon. And if icon is not centered, type something in label and delete."
            }),
            PropertyPaneToggle('blank',{
              label:"Open in new tab?"
            }),
            PropertyPaneToggle('icon',{
              label:"Add icon?"
            }),
            PropertyFieldIconPicker('iconPicker', {
              currentIcon: this.properties.iconPicker,
              key: "iconPickerId",
              onSave: (icon: string) => { this.properties.iconPicker = icon; },
              buttonLabel: "Icon",
              renderOption: "panel",
              properties: this.properties,
              onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
              label: "Icon Picker",
                      
            }),
            PropertyPaneTextField('css', {
              label: "Button CSS",
              multiline: true,
              rows: 6
            }),
            PropertyPaneTextField('css_hover', {
              label: "Hover CSS",
              multiline: true,
              rows: 6
            }),
            PropertyPaneTextField('css_icon', {
              label: "Icon CSS",
              multiline: true,
              rows: 6
            }),
            PropertyPaneTextField('css_label', {
              label: "Label CSS",
              multiline: true,
              rows: 6
            })
          ]
        },
      ]
    }    
  ]


  if(this.properties.buttonsNumber > 1) {
    pagesArray.push(
      {
        header: {
          description: "Button 2 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link2', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label2', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank2',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon2',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker2', {
                currentIcon: this.properties.iconPicker2,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker2 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css2', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css2_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css2_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css2_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }
      )
  } 

  if(this.properties.buttonsNumber > 2) {
    pagesArray.push(
      {
        header: {
          description: "Button 3 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link3', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label3', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank3',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon3',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker3', {
                currentIcon: this.properties.iconPicker3,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker3 = icon; },

                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css3', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css3_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css3_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css3_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }   
      )
  } 

  if(this.properties.buttonsNumber > 3) {
    pagesArray.push(
      {
        header: {
          description: "Button 4 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link4', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label4', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank4',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon4',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker4', {
                currentIcon: this.properties.iconPicker4,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker4 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css4', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css4_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css4_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css4_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }  
      )
  } 

  if(this.properties.buttonsNumber > 4) {
    pagesArray.push(
      {
        header: {
          description: "Button 5 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link5', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label5', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank5',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon5',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker5', {
                currentIcon: this.properties.iconPicker5,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker5 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css5', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css5_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css5_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css5_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }
      )
  } 

  if(this.properties.buttonsNumber > 5) {
    pagesArray.push(
      {
        header: {
          description: "Button 6 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link6', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label6', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank6',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon6',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker6', {
                currentIcon: this.properties.iconPicker6,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker6 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css6', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css6_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css6_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css6_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }
      )
  } 

  if(this.properties.buttonsNumber > 6) {
    pagesArray.push(
      {
        header: {
          description: "Button 7 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link7', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label7', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank7',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon7',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker7', {
                currentIcon: this.properties.iconPicker7,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker7 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css7', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css7_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css7_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css7_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }
      )
  } 

  if(this.properties.buttonsNumber > 7) {
    pagesArray.push(
      {
        header: {
          description: "Button 8 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link8', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label8', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank8',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon8',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker8', {
                currentIcon: this.properties.iconPicker8,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker8 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css8', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css8_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css8_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css8_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }
      )
  } 

  if(this.properties.buttonsNumber > 8) {
    pagesArray.push(
      {
        header: {
          description: "Button 9 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link9', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label9', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank9',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon9',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker9', {
                currentIcon: this.properties.iconPicker9,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker9 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css9', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css9_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css9_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css9_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }
      )
  } 

  if(this.properties.buttonsNumber > 9) {
      pagesArray.push(
      {
        header: {
          description: "Button 10 settings"
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "Button basic settings",
            isCollapsed:false,
            groupFields: [
              PropertyPaneTextField('link10', {
                label: "Add URL link",
                multiline: true
              }),
              PropertyPaneTextField('label10', {
                label: "Add button label"
              }),
              PropertyPaneToggle('blank10',{
                label:"Open in new tab?"
              }),
              PropertyPaneToggle('icon10',{
                label:"Add icon?"
              }),
              PropertyFieldIconPicker('iconPicker10', {
                currentIcon: this.properties.iconPicker10,
                key: "iconPickerId",
                onSave: (icon: string) => { this.properties.iconPicker10 = icon; },
                buttonLabel: "Icon",
                renderOption: "panel",
                properties: this.properties,
                onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                label: "Icon Picker"              
              }),
              PropertyPaneTextField('css10', {
                label: "Add CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css10_hover', {
                label: "Hover CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css10_icon', {
                label: "Icon CSS",
                multiline: true,
                rows: 6
              }),
              PropertyPaneTextField('css10_label', {
                label: "Label CSS",
                multiline: true,
                rows: 6
              })
            ]
          }
        ]
      }
    )
  }

    return {
      pages: pagesArray
    };
  }
}
