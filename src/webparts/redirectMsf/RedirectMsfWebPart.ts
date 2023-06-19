import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'RedirectMsfWebPartStrings';
import RedirectMsfHandler from './components/RedirectMsfHandler';
import { IRedirectMsfProps } from './components/IRedirectMsfProps';

export interface IRedirectMsfWebPartProps {
  redirect_default_url: string;

  redirect_message: string;
  redirect_url: string;
  redirect_counter: number;

  redirect_BG: string; 
  redirect_BR: number;
  redirect_size: number;
  redirect_FC: string;

  redirect_counter_display: boolean;
  redirect_counter_size: number;
  redirect_counter_FC: string;

  redirect_stop_display: boolean;
  redirect_stop_text: string;
  redirect_stop_size: string;
  redirect_stop_BG: string;
  redirect_stop_BR: number;
  redirect_stop_FC: string
}

export default class RedirectMsfWebPart extends BaseClientSideWebPart<IRedirectMsfWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IRedirectMsfProps> = React.createElement(
      RedirectMsfHandler,
      {
        redirect_default_url: window.location.href,

        redirect_message: this.properties.redirect_message,
        redirect_url: this.properties.redirect_url,
        redirect_counter: this.properties.redirect_counter,

        redirect_BG: this.properties.redirect_BG, 
        redirect_BR: this.properties.redirect_BR,
        redirect_size: this.properties.redirect_size,
        redirect_FC: this.properties.redirect_FC,

        redirect_counter_display: this.properties.redirect_counter_display,
        redirect_counter_size: this.properties.redirect_counter_size,
        redirect_counter_FC: this.properties.redirect_counter_FC,

        redirect_stop_display: this.properties.redirect_stop_display,
        redirect_stop_text: this.properties.redirect_stop_text,
        redirect_stop_size: this.properties.redirect_stop_size,
        redirect_stop_BG: this.properties.redirect_stop_BG,
        redirect_stop_BR: this.properties.redirect_stop_BR,
        redirect_stop_FC: this.properties.redirect_stop_FC
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
            description: "This"
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "General settings",
              isCollapsed:false,
              groupFields: [
                PropertyPaneTextField('redirect_message', {
                  label: "Redirect message",
                  multiline: true,
                  resizable: true,
                  rows: 2,
                  placeholder: "i.e. You will redirect to msf.org in"
                }),
                PropertyPaneTextField('redirect_url', {
                  label: "Redirect to",
                  multiline: true,
                  resizable: true,
                  rows: 2,
                  placeholder: "https://msfintl.sharepoint.com/sites/..."
                }),
                PropertyPaneSlider('redirect_counter', {
                  label: "Set seconds till redirect",
                  min: 0,
                  max: 60,
                  showValue: true,

                }),
               
              ]
            },
            {
              groupName: "General visuals",
              isCollapsed:true,
              groupFields: [
                PropertyFieldColorPicker('redirect_BG', {
                  label: 'Background color',
                  selectedColor: this.properties.redirect_BG,
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
                PropertyPaneSlider('redirect_BR', {
                  label: "Border radius (px)",
                  min: 0,
                  max: 100,
                  showValue: true,
                }),
                PropertyFieldColorPicker('redirect_FC', {
                  label: 'Message font color',
                  selectedColor: this.properties.redirect_FC,
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
                PropertyPaneSlider('redirect_size', {
                  label: "Message font size (px)",
                  min: 12,
                  max: 60,
                  showValue: true,
                })
              ]
            },
            {
              groupName: "Counter visuals",
              isCollapsed:true,
              groupFields: [
                PropertyPaneToggle('redirect_counter_display', {
                  label: "Display counter?",
                  checked: true
                }),
                
                PropertyPaneSlider('redirect_counter_size', {
                  label: "Set size of the counter (px)",
                  min: 12,
                  max: 60,
                  showValue: true,
                }),
                PropertyFieldColorPicker('redirect_counter_FC', {
                  label: 'Message font color',
                  selectedColor: this.properties.redirect_counter_FC,
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
              ]
            },
            {
              groupName: "Stop button visuals",
              isCollapsed:true,
              groupFields: [
                PropertyPaneToggle('redirect_stop_display', {
                  label: "Display stop button?",
                  checked: true
                }),
                PropertyPaneTextField('redirect_stop_text', {
                  label: "Stop button text",
                }),
                PropertyFieldColorPicker('redirect_stop_BG', {
                  label: 'Stop button background color',
                  selectedColor: this.properties.redirect_stop_BG,
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
                PropertyPaneSlider('redirect_stop_BR', {
                  label: "Stop button border radius(px)",
                  min: 0,
                  max: 100,
                  showValue: true,
                }),
                PropertyPaneSlider('redirect_stop_size', {
                  label: "Stop button font size(px)",
                  min: 12,
                  max: 60,
                  showValue: true,
                }),
                PropertyFieldColorPicker('redirect_stop_FC', {
                  label: 'Stop button font color',
                  selectedColor: this.properties.redirect_stop_FC,
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
              ]
            }
          ]
        }
      ]
    };
  }
}
