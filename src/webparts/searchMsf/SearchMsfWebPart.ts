import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldIconPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldIconPicker';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SearchMsfWebPartStrings';
import SearchMsfHandler from './components/SearchMsfHandler';
import { ISearchMsfProps } from './components/ISearchMsfProps';

export interface ISearchMsfWebPartProps {
  wrapper_justify: string;
  wrapper_bg: string;
  wrapper_br: string;

  input_placeholder: string;
  input_suffix: string;
  input_width: string;
  input_height: string;
  input_font: string;
  input_margin: string;
  input_br: string;
  input_border:string;

  dropdown_url: string;
  dropdown_label: string;
  dropdown_width: string;
  dropdown_height: string;
  dropdown_font: string;
  dropdown_margin: string;
  dropdown_br: string;
  dropdown_border:string;

  button_label: string;
  button_blank: string;
  button_icontoggle: boolean;
  button_icon: string;
  button_width: string;
  button_height: string;
  button_borderRadius: string;
  button_fontsize: string;
  button_color: string;
  button_fontcolor: string;
  button_margin: string
}

export default class SearchMsfWebPart extends BaseClientSideWebPart<ISearchMsfWebPartProps> {

    public render(): void {
    const element: React.ReactElement<ISearchMsfProps> = React.createElement(
      SearchMsfHandler,
      {
        wrapper_justify: this.properties.wrapper_justify,
        wrapper_bg: this.properties.wrapper_bg,
        wrapper_br: this.properties.wrapper_br,

        input_placeholder: this.properties.input_placeholder,
        input_suffix: this.properties.input_suffix,
        input_width: this.properties.input_width,
        input_height: this.properties.input_height,
        input_font: this.properties.input_font,
        input_margin: this.properties.input_margin,
        input_br: this.properties.input_br,
        input_border: this.properties.input_border,

        dropdown_url: this.properties.dropdown_url,
        dropdown_label: this.properties.dropdown_label,
        dropdown_width: this.properties.dropdown_width,
        dropdown_height: this.properties.dropdown_height,
        dropdown_font: this.properties.dropdown_font,
        dropdown_margin: this.properties.dropdown_margin,
        dropdown_br: this.properties.dropdown_br,
        dropdown_border: this.properties.dropdown_border,

        button_label: this.properties.button_label,
        button_blank: this.properties.button_blank,
        button_icontoggle: this.properties.button_icontoggle,
        button_icon: this.properties.button_icon,
        button_width: this.properties.button_width,
        button_height: this.properties. button_height,
        button_borderRadius: this.properties.button_borderRadius,
        button_fontsize: this.properties.button_fontsize,
        button_color: this.properties.button_color,
        button_fontcolor: this.properties.button_fontcolor,
        button_margin: this.properties.button_margin
      }
    );

    ReactDom.render(element, this.domElement);
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
            description: "This webpart has 3 items. Input field, dropdown menu and a button. You can create dynamic links where order is dropdown menu + input field (+suffix) and navigate to them either by pressing enter or click the button. In general section you can set your solution alignment, visuals etc."
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "General",
              isCollapsed:true,
              groupFields: [
                PropertyPaneChoiceGroup("wrapper_justify", {
                  label: "Solution alignment",
                  options: [
                    { key: "start", text: "Start" },
                    { key: "center", text: "Center" },
                    { key: "end", text: "End" }
                  ]
                }),
                PropertyFieldColorPicker("wrapper_bg", {
                  label: 'Solution background color',
                  selectedColor: this.properties.wrapper_bg,
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
                PropertyPaneTextField('wrapper_br', {
                  label: "Solution border radius"
                }),
                PropertyPaneToggle('button_blank',{
                  label:"Open in new tab?"
                })  
              ]
            },
            {
              groupName: "Input field",
              isCollapsed:true,
              groupFields: [
                PropertyPaneTextField('input_placeholder', {
                  label: "Input field text placeholder"
                }),
                PropertyPaneTextField('input_suffix', {
                  label: "Add link suffix",
                  description: "Add optional suffix like asterix, which will be attached to the input"
                }),
                PropertyPaneTextField('input_width', {
                  label: "Input field width (px)"
                }),
                PropertyPaneTextField('input_height', {
                  label: "Input field height (px)"
                }),
                PropertyPaneTextField('input_br', {
                  label: "Input field border radius (px)"
                }),
                PropertyPaneTextField('input_font', {
                  label: "Input field font size (px)"
                }),
                PropertyPaneTextField('input_margin', {
                  label: "Input field margin (px)"
                }),
                PropertyPaneTextField('input_border', {
                  label: "Set border",
                  description:"Use CSS format 'size type color' i.e. '2px solid rgb(123,123,13)'"
                })
              ]
            },
            {
              groupName: "Dropdown",
              isCollapsed:true,
              groupFields: [
                PropertyPaneTextField('dropdown_url', {
                  label: "Option url",
                  multiline: true,
                  rows: 4,
                  description:"Enter url addresses, seperated by ; delimiter and with no spaces."
                }),
                PropertyPaneTextField('dropdown_label', {
                  label: "Option label",
                  multiline: true,
                  rows: 4,
                  description:"Enter labels for the url, seperated by ; delimiter and with no spaces."
                }),
                PropertyPaneTextField('dropdown_width', {
                  label: "Dropdown width (px)"
                }),
                PropertyPaneTextField('dropdown_height', {
                  label: "Dropdown height (px)"
                }),
                PropertyPaneTextField('dropdown_br', {
                  label: "Dropdown border radius (px)"
                }),
                PropertyPaneTextField('dropdown_font', {
                  label: "Dropdown font size (px)"
                }),
                PropertyPaneTextField('dropdown_margin', {
                  label: "Dropdown margin"
                }),
                PropertyPaneTextField('dropdown_border', {
                  label: "Set border (px)",
                  description:"Use CSS format 'size type color' i.e. '2px solid rgb(123,123,13)'"
                })
              ]
            },
            {
              groupName: "Button",
              isCollapsed:true,
              groupFields: [
                PropertyPaneTextField('button_label', {
                  label: "Add button label",
                  description:"If the label is not properly centered try to ON/OFF the icon. And if icon is not centered, type something in label and delete."
                }),
                PropertyPaneToggle('button_icontoggle',{
                  label:"Add icon?"
                }),
                PropertyFieldIconPicker('button_icon', {
                  currentIcon: this.properties.button_icon,
                  key: "iconPickerId",
                  onSave: (icon: string) => { this.properties.button_icon = icon; },
                  buttonLabel: "Icon",
                  renderOption: "panel",
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  label: "Icon Picker",                        
                }),
                PropertyPaneTextField('button_width', {
                  label: "Set width (px)"
                }),
                PropertyPaneTextField('button_height', {
                  label: "Set height (px)"
                }),
                PropertyPaneTextField('button_borderRadius', {
                  label: "Set border radius (px)"
                }),
                PropertyPaneTextField('button_fontsize', {
                  label: "Set font size (px)"
                }),
                PropertyFieldColorPicker('button_color', {
                  label: 'Button background color',
                  selectedColor: this.properties.button_color,
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
                PropertyFieldColorPicker('button_fontcolor', {
                  label: 'Button font color',
                  selectedColor: this.properties.button_fontcolor,
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
                PropertyPaneTextField('button_margin', {
                  label: "Set margin (px)",
                
                }),
              ]
            },
          ]
        }
      ]
    };
  }
}
