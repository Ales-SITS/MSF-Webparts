import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AnchorListMsfWebPartStrings';
import AnchorListMsf from './components/AnchorListMsf';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import { IAnchorListMsfProps } from './components/IAnchorListMsfProps';

export interface IAnchorListMsfWebPartProps {
  AnchorListTitle: string;
  AnchorListSymbol: string;
  ListAlignment:string;
  TextAlignment:string;
  BorderRadius: string;
  ListBG: string;
  ListColor: string;
  HeaderBG:string;
  HeaderColor:string;
  Line: string
}

export default class AnchorListMsfWebPart extends BaseClientSideWebPart<IAnchorListMsfWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAnchorListMsfProps> = React.createElement(
      AnchorListMsf,
      {
        AnchorListTitle: this.properties.AnchorListTitle,
        AnchorListSymbol: this.properties.AnchorListSymbol,
        ListAlignment:this.properties.ListAlignment,
        TextAlignment:this.properties.TextAlignment,
        BorderRadius: this.properties.BorderRadius,
        ListBG: this.properties.ListBG,
        ListColor: this.properties.ListColor,
        HeaderBG: this.properties.HeaderBG,
        HeaderColor: this.properties.HeaderColor,
        Line: this.properties.Line
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
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Anchor list settings",
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
                PropertyFieldColorPicker('ListColor', {
                  label: 'Font color',
                  selectedColor: this.properties.ListColor,
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
              groupName: "Customize Header",
              isCollapsed:true,
              groupFields: [
                PropertyPaneTextField('AnchorListTitle', {
                  label: "Anchor List Title"
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
              groupName: "Customize Anchor",
              isCollapsed:true,
              groupFields: [
                PropertyPaneDropdown("AnchorListSymbol", {
                  label: "Preppend with",
                  options: [
                    { key: "", text: "Nothing" },
                    { key: "⚬", text: "Circle ⚬" },
                    { key: "●", text: "Full circle ●" },
                    { key: "▪", text: "Square ▪" },
                    { key: "▸", text: "Arrow ▸" }, 
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
