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
import ButtonMsf from './components/ButtonMsf';
import { PropertyFieldIconPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldIconPicker';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

export interface IButtonMsfProps {
  buttonsNumber: number;
  buttonAlignment: string;
  buttonsDirection:string;
  link: string; label: string; blank: boolean; icon: boolean; iconPicker: string; width: string; height: string; borderRadius: string; color: string; margin: string; textAlignment:string; textSize:string; textColor: string;
  link2: string; label2: string; blank2: boolean; icon2: boolean; iconPicker2: string; width2: string; height2: string; borderRadius2: string; color2: string; margin2: string; textAlignment2:string; textSize2:string; textColor2: string;
  link3: string; label3: string; blank3: boolean; icon3: boolean; iconPicker3: string; width3: string; height3: string; borderRadius3: string; color3: string; margin3: string; textAlignment3:string; textSize3:string; textColor3: string;
  link4: string; label4: string; blank4: boolean; icon4: boolean; iconPicker4: string; width4: string; height4: string; borderRadius4: string; color4: string; margin4: string; textAlignment4:string; textSize4:string; textColor4: string;
  link5: string; label5: string; blank5: boolean; icon5: boolean; iconPicker5: string; width5: string; height5: string; borderRadius5: string; color5: string; margin5: string; textAlignment5:string; textSize5:string; textColor5: string;
  link6: string; label6: string; blank6: boolean; icon6: boolean; iconPicker6: string; width6: string; height6: string; borderRadius6: string; color6: string; margin6: string; textAlignment6:string; textSize6:string; textColor6: string;
  link7: string; label7: string; blank7: boolean; icon7: boolean; iconPicker7: string; width7: string; height7: string; borderRadius7: string; color7: string; margin7: string; textAlignment7:string; textSize7:string; textColor7: string;
  link8: string; label8: string; blank8: boolean; icon8: boolean; iconPicker8: string; width8: string; height8: string; borderRadius8: string; color8: string; margin8: string; textAlignment8:string; textSize8:string; textColor8: string;
  link9: string; label9: string; blank9: boolean; icon9: boolean; iconPicker9: string; width9: string; height9: string; borderRadius9: string; color9: string; margin9: string; textAlignment9:string; textSize9:string; textColor9: string;
  link10: string; label10: string; blank10: boolean; icon10: boolean; iconPicker10: string; width10: string; height10: string; borderRadius10: string; color10: string; margin10: string; textAlignment10:string; textSize10:string; textColor10: string;
}

export default class ButtonMsfWebPart extends BaseClientSideWebPart<IButtonMsfProps> {

  
  public render(): void {
    const element: React.ReactElement<IButtonMsfProps> = React.createElement(
      ButtonMsf,
      {
        buttonsNumber: this.properties.buttonsNumber,
        buttonAlignment: this.properties.buttonAlignment,
        buttonsDirection:this.properties.buttonsDirection,
        link: this.properties.link, label: this.properties.label, blank: this.properties.blank, icon: this.properties.icon, iconPicker: this.properties.iconPicker, width: this.properties.width, height: this.properties.height, borderRadius: this.properties.borderRadius, color: this.properties.color, margin: this.properties.margin, textAlignment:this.properties.textAlignment, textSize:this.properties.textSize, textColor:this.properties.textColor,
        link2: this.properties.link2, label2: this.properties.label2, blank2: this.properties.blank2, icon2: this.properties.icon2, iconPicker2: this.properties.iconPicker2, width2: this.properties.width2, height2: this.properties.height2, borderRadius2: this.properties.borderRadius2, color2: this.properties.color2, margin2: this.properties.margin2, textAlignment2:this.properties.textAlignment2, textSize2:this.properties.textSize2, textColor2:this.properties.textColor2,
        link3: this.properties.link3, label3: this.properties.label3, blank3: this.properties.blank3, icon3: this.properties.icon3, iconPicker3: this.properties.iconPicker3, width3: this.properties.width3, height3: this.properties.height3, borderRadius3: this.properties.borderRadius3, color3: this.properties.color3, margin3: this.properties.margin3, textAlignment3:this.properties.textAlignment3, textSize3:this.properties.textSize3, textColor3:this.properties.textColor3,
        link4: this.properties.link4, label4: this.properties.label4, blank4: this.properties.blank4, icon4: this.properties.icon4, iconPicker4: this.properties.iconPicker4, width4: this.properties.width4, height4: this.properties.height4, borderRadius4: this.properties.borderRadius4, color4: this.properties.color4, margin4: this.properties.margin4, textAlignment4:this.properties.textAlignment4, textSize4:this.properties.textSize4, textColor4:this.properties.textColor4,
        link5: this.properties.link5, label5: this.properties.label5, blank5: this.properties.blank5, icon5: this.properties.icon5, iconPicker5: this.properties.iconPicker5, width5: this.properties.width5, height5: this.properties.height5, borderRadius5: this.properties.borderRadius5, color5: this.properties.color5, margin5: this.properties.margin5, textAlignment5:this.properties.textAlignment5, textSize5:this.properties.textSize5, textColor5:this.properties.textColor5,
        link6: this.properties.link6, label6: this.properties.label6, blank6: this.properties.blank6, icon6: this.properties.icon6, iconPicker6: this.properties.iconPicker6, width6: this.properties.width6, height6: this.properties.height6, borderRadius6: this.properties.borderRadius6, color6: this.properties.color6, margin6: this.properties.margin6, textAlignment6:this.properties.textAlignment6, textSize6:this.properties.textSize6, textColor6:this.properties.textColor6,
        link7: this.properties.link7, label7: this.properties.label7, blank7: this.properties.blank7, icon7: this.properties.icon7, iconPicker7: this.properties.iconPicker7, width7: this.properties.width7, height7: this.properties.height7, borderRadius7: this.properties.borderRadius7, color7: this.properties.color7, margin7: this.properties.margin7, textAlignment7:this.properties.textAlignment7, textSize7:this.properties.textSize7, textColor7:this.properties.textColor7,
        link8: this.properties.link8, label8: this.properties.label8, blank8: this.properties.blank8, icon8: this.properties.icon8, iconPicker8: this.properties.iconPicker8, width8: this.properties.width8, height8: this.properties.height8, borderRadius8: this.properties.borderRadius8, color8: this.properties.color8, margin8: this.properties.margin8, textAlignment8:this.properties.textAlignment8, textSize8:this.properties.textSize8, textColor8:this.properties.textColor8,
        link9: this.properties.link9, label9: this.properties.label9, blank9: this.properties.blank9, icon9: this.properties.icon9, iconPicker9: this.properties.iconPicker9, width9: this.properties.width9, height9: this.properties.height9, borderRadius9: this.properties.borderRadius9, color9: this.properties.color9, margin9: this.properties.margin9, textAlignment9:this.properties.textAlignment9, textSize9:this.properties.textSize9, textColor9:this.properties.textColor9,
        link10: this.properties.link10, label10: this.properties.label10, blank10: this.properties.blank10, icon10: this.properties.icon10, iconPicker10: this.properties.iconPicker10, width10: this.properties.width10, height10: this.properties.height10, borderRadius10: this.properties.borderRadius10, color10: this.properties.color10, margin10: this.properties.margin10, textAlignment10:this.properties.textAlignment10, textSize10:this.properties.textSize10, textColor10:this.properties.textColor10
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
        description: "Welcome! On this page (1), you can set number of buttons (up to 10) and their general layout. You can also set all the details for your first button, which visuals works as default for other buttons too. In the next pages (i.e. button 2 = page(2)) you can set other buttons and rewrite the default visual settings for that specific button if needed."
      },
      displayGroupsAsAccordion: true,
      groups: [           
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
          ]
        },
        {
          groupName: "Button 1 visual settings",
          isCollapsed:true,
          groupFields: [
            PropertyPaneTextField('width', {
              label: "Set width (px)"
            }),
            PropertyPaneTextField('height', {
              label: "Set height (px)"
            }),
            PropertyPaneTextField('borderRadius', {
              label: "Set border radius (px)"
            }),
            PropertyFieldColorPicker('color', {
              label: 'Color',
              selectedColor: this.properties.color,
              onPropertyChange: this.onPropertyPaneFieldChanged,
              properties: this.properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: 'Precipitation',
              key: 'colorFieldId'
            }),
            PropertyPaneTextField('margin', {
              label: "Set margin",
              description: "Use CSS pattern and include unit, i.e. '5px' for all direction or '2px 4px' for bottom-up and left-right etc. Check https://www.w3schools.com/css/css_margin.asp for more details"
            }),
          ]
        },
        {
          groupName: "Button 1 text settings",
          isCollapsed:true,
          groupFields: [
            PropertyPaneChoiceGroup("textAlignment", {
              label: "Text alignment",
              options: [
                { key: "start", text: "Left" },
                { key: "center", text: "Center" },
                { key: "end", text: "Right" }
              ]
            }),
            PropertyPaneTextField('textSize', {
              label: "Set text size (px)"
            }),
            PropertyFieldColorPicker('textColor', {
              label: 'Set text color',
              selectedColor: this.properties.color,
              onPropertyChange: this.onPropertyPaneFieldChanged,
              properties: this.properties,
              disabled: false,
              debounce: 1000,
              isHidden: false,
              alphaSliderHidden: false,
              style: PropertyFieldColorPickerStyle.Inline,
              iconName: 'Precipitation',
              key: 'colorFieldId'
            })
          ]
        }
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width2', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height2', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius2', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color2', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
            PropertyPaneTextField('margin2', {
              label: "Set margin"
            }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment2", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize2', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor2', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width3', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height3', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius3', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color3', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin3', {
                label: "Set margin"
              }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment3", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize3', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor3', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width4', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height4', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius4', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color4', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin4', {
                label: "Set margin"
              }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment4", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize4', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor4', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width5', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height5', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius5', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color5', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin5', {
                label: "Set margin"
              }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment5", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize5', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor5', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width6', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height6', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius6', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color6', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin6', {
                label: "Set margin"
              }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment6", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize6', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor6', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width7', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height7', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius7', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color7', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin7', {
                label: "Set margin"
              }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment7", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize7', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor7', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width8', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height8', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius8', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color8', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin8', {
                label: "Set margin"
              }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment8", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize8', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor8', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width9', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height9', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius9', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color9', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin9', {
                label: "Set margin"
              }),
            ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment9", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize9', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor9', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
            ]
          },
          {
            groupName: "Button visual settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneTextField('width10', {
                label: "Set width (px)"
              }),
              PropertyPaneTextField('height10', {
                label: "Set height (px)"
              }),
              PropertyPaneTextField('borderRadius10', {
                label: "Set border radius (px)"
              }),
              PropertyFieldColorPicker('color10', {
                label: 'Color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
              }),
              PropertyPaneTextField('margin10', {
                label: "Set margin"
              }),
              ]
          },
          {
            groupName: "Button text settings",
            isCollapsed:true,
            groupFields: [
              PropertyPaneChoiceGroup("textAlignment10", {
                label: "Text alignment",
                options: [
                  { key: "start", text: "Left" },
                  { key: "center", text: "Center" },
                  { key: "end", text: "Right" }
                ]
              }),
              PropertyPaneTextField('textSize10', {
                label: "Set text size (px)"
              }),
              PropertyFieldColorPicker('textColor10', {
                label: 'Set text color',
                selectedColor: this.properties.color,
                onPropertyChange: this.onPropertyPaneFieldChanged,
                properties: this.properties,
                disabled: false,
                debounce: 1000,
                isHidden: false,
                alphaSliderHidden: false,
                style: PropertyFieldColorPickerStyle.Inline,
                iconName: 'Precipitation',
                key: 'colorFieldId'
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
