import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AnchorListMsfWebPartStrings';
import AnchorListMsf from './components/AnchorListMsf';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import { IAnchorListMsfProps } from './components/IAnchorListMsfProps';

export interface IAnchorListMsfWebPartProps {
  AnchorListTitle: string;
  ListAlignment:string;
  TextAlignment:string;
  BorderRadius: string;
  ListBG: string;
  HeaderBG:string;
  HeaderColor:string;
  header_size: string;
  Line: string;
  h2_toggle: boolean;
  h2_size: string;
  h2_ind: string;
  h2_color: string;
  h2_symbol: string;
  h3_toggle: boolean;
  h3_size: string;
  h3_ind: string;
  h3_color: string;
  h3_symbol: string;
  h4_toggle: boolean;
  h4_size: string;
  h4_ind: string;
  h4_color: string;
  h4_symbol: string;
}

export default class AnchorListMsfWebPart extends BaseClientSideWebPart<IAnchorListMsfWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAnchorListMsfProps> = React.createElement(
      AnchorListMsf,
      {
        AnchorListTitle: this.properties.AnchorListTitle,
        ListAlignment:this.properties.ListAlignment,
        TextAlignment:this.properties.TextAlignment,
        BorderRadius: this.properties.BorderRadius,
        ListBG: this.properties.ListBG,
        HeaderBG: this.properties.HeaderBG,
        HeaderColor: this.properties.HeaderColor,
        header_size: this.properties.header_size,
        Line: this.properties.Line,
        h2_toggle: this.properties.h2_toggle,
        h2_size: this.properties.h2_size,
        h2_ind: this.properties.h2_ind,
        h2_color: this.properties.h2_color,
        h2_symbol: this.properties.h2_symbol,
        h3_toggle: this.properties.h3_toggle,
        h3_size: this.properties.h3_size,
        h3_ind: this.properties.h3_ind,
        h3_color: this.properties.h3_color,
        h3_symbol: this.properties.h3_symbol,
        h4_toggle: this.properties.h4_toggle,
        h4_size: this.properties.h4_size,
        h4_ind: this.properties.h4_ind,
        h4_color: this.properties.h4_color,
        h4_symbol: this.properties.h4_symbol,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "This webpart reads the page DOM and finds automatically all anchors created by text webpart headings and displayes them in a clickable list."
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "General settings",
              isCollapsed:true,
              groupFields: [
                PropertyPaneChoiceGroup("ListAlignment", {
                  label: "List alignment",
                  options: [
                    { key: "start", text: "Start" },
                    { key: "center", text: "Center" },
                    { key: "end", text: "End" },
                  ]
                }),
                PropertyPaneChoiceGroup("TextAlignment", {
                  label: "Text alignment",
                  options: [
                    { key: "start", text: "Left" },
                    { key: "center", text: "Center" },
                    { key: "end", text: "Right" },
                  ]
                }),
                PropertyFieldColorPicker('ListBG', {
                  label: 'Background color',
                  selectedColor: this.properties.ListBG,
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
                PropertyPaneTextField('BorderRadius', {
                  label: "Border radius (px)"
                }),
              ]
            },
            {
              groupName: "Header settings",
              isCollapsed:true,
              groupFields: [
                PropertyPaneTextField('AnchorListTitle', {
                  label: "Anchor List Title"
                }),
                PropertyPaneTextField('header_size', {
                  label: "Font size (px)"
                }), 
                PropertyFieldColorPicker('HeaderBG', {
                  label: 'Header background color',
                  selectedColor: this.properties.HeaderBG,
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
                PropertyFieldColorPicker('HeaderColor', {
                  label: 'Header font color',
                  selectedColor: this.properties.HeaderColor,
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
                PropertyPaneTextField('Line', {
                  description:"Use CSS format with size, type and possibly color, i.e. '2px solid red' ",
                  label: "Header bottom line"
                }),
              ]
            },           
            {
              groupName: "Heading 1 level",
              isCollapsed:true,
              groupFields: [
                PropertyPaneToggle('h2_toggle', {
                  label: "Hide Heading 1",
                  offText: "Off",
                  onText: "On",
                  checked: false
                }),
                PropertyPaneTextField('h2_size', {
                  label: "Font size (px)"
                }),
                PropertyPaneTextField('h2_ind', {
                  label: "Indentation (px)"
                }),
                PropertyFieldColorPicker('h2_color', {
                  label: 'Font color',
                  selectedColor: this.properties.h2_color,
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
                PropertyPaneDropdown('h2_symbol',{
                  label: "Prefix" ,
                  options: [
                    { key: '', text: 'none'},
                    { key: '●', text: '●'},
                    { key: '⬤', text: '⬤' },
                    { key: '○', text: '○' },
                    { key: '◯', text: '◯' },
                    { key: '▪', text: '▪' },
                    { key: '■', text: '■'},
                    { key: '□', text: '□'},
                    { key: '◻', text: '◻'},
                    { key: '◆', text: '◆'},
                    { key: '◇', text: '◇'},
                  ] 
                })
              ]
            },
            {
              groupName: "Heading 2 level",
              isCollapsed:true,
              groupFields: [
                PropertyPaneToggle('h3_toggle', {
                  label: "Hide Heading 2",
                  offText: "Off",
                  onText: "On",
                  checked: false
              }),
              PropertyPaneTextField('h3_size', {
                label: "Font size (px)"
              }),
              PropertyPaneTextField('h3_ind', {
                label: "Indentation (px)"
              }),
              PropertyFieldColorPicker('h3_color', {
                label: 'Font color',
                selectedColor: this.properties.h3_color,
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
              PropertyPaneDropdown('h3_symbol',{
                label: "Prefix" ,
                options: [
                  { key: '', text: 'none'},
                  { key: '●', text: '●'},
                  { key: '⬤', text: '⬤' },
                  { key: '○', text: '○' },
                  { key: '◯', text: '◯' },
                  { key: '▪', text: '▪' },
                  { key: '■', text: '■'},
                  { key: '□', text: '□'},
                  { key: '◻', text: '◻'},
                  { key: '◆', text: '◆'},
                  { key: '◇', text: '◇'},
                ] 
              })
              ]
            },
            {
              groupName: "Heading 3 level",
              isCollapsed:true,
              groupFields: [
                PropertyPaneToggle('h4_toggle', {
                  label: "Hide Heading 3",
                  offText: "Off",
                  onText: "On",
                  checked: false
              }),
              PropertyPaneTextField('h4_size', {
                label: "Font size (px)"
              }),
              PropertyPaneTextField('h4_ind', {
                label: "Indentation (px)"
              }),
              PropertyFieldColorPicker('h4_color', {
                label: 'Font color',
                selectedColor: this.properties.h4_color,
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
              PropertyPaneDropdown('h4_symbol',{
                label: "Prefix" ,
                options: [
                  { key: '', text: 'none'},
                  { key: '●', text: '●'},
                  { key: '⬤', text: '⬤' },
                  { key: '○', text: '○' },
                  { key: '◯', text: '◯' },
                  { key: '▪', text: '▪' },
                  { key: '■', text: '■'},
                  { key: '□', text: '□'},
                  { key: '◻', text: '◻'},
                  { key: '◆', text: '◆'},
                  { key: '◇', text: '◇'},
                ] 
              })
              ]
            }
            
          ]
        }
      ]
    };
  }
}
