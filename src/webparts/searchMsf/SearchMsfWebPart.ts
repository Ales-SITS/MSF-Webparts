import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneToggle,
  PropertyPaneHorizontalRule,
  PropertyPaneLink
} from '@microsoft/sp-property-pane';

//PnP Property Pane
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { PropertyFieldIconPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldIconPicker';
import { PropertyFieldMonacoEditor } from '@pnp/spfx-property-controls/lib/PropertyFieldMonacoEditor';


import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import SearchMsfHandler from './components/SearchMsfHandler';
export interface ISearchMsfWebPartProps {
  solution_urls: any[];
  solution_blank: string;
  dropdown_display: string;
  button_display: string;
  search_CSS: string
  input_placeholder: string;
  button_label: string;
  button_icontoggle: boolean;
  button_icon: string;
  context: any;
}

export default class SearchMsfWebPart extends BaseClientSideWebPart<ISearchMsfWebPartProps> {
    public render(): void {

    const existingStyleElement = document.head.querySelector('style[data-webpart-styles]');
      if (existingStyleElement) {
        existingStyleElement.remove();
    }

    const webPartId = this.context.instanceId.replaceAll("-","")
    const dynamicStyles = document.createElement('style');
    const dynamicStylesContent = this.properties.search_CSS.replaceAll(".searchmsf__",`.searchmsf_${webPartId}_`);
    dynamicStyles.textContent = dynamicStylesContent;
    
    const element: React.ReactElement<ISearchMsfWebPartProps> = React.createElement(
      SearchMsfHandler,
      {
        solution_urls: this.properties.solution_urls,
        solution_blank: this.properties.solution_blank,        
        input_placeholder: this.properties.input_placeholder,
        dropdown_display: this.properties.dropdown_display,
        button_display: this.properties.button_display,
        button_label: this.properties.button_label,
        button_icontoggle: this.properties.button_icontoggle,
        button_icon: this.properties.button_icon,
        context: this.context
      }
    );

    document.head.appendChild(dynamicStyles);

    ReactDom.render(
      element,
      this.domElement);
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
            description: "With this webpart you can link search input field to multiple instances on SharePoint and outside. Just set query URL(s) and customize"
          },
          groups: [
            {
              groupName: "Webpart properties",
              isCollapsed:false,
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyFieldCollectionData("solution_urls", {
                  key: "urls",
                  label: "Target URL(s)",
                  panelHeader: "Set URL and labels for dropdown",
                  manageBtnLabel: "Manage URL(s)",
                  enableSorting: true,
                  value: this.properties.solution_urls,
                  fields: [
                    {
                      id: "drop_url",
                      title: "Option URL",
                      type: CustomCollectionFieldType.url,
                      required: true
                    },
                    {
                      id: "drop_label",
                      title: "Option text",
                      type: CustomCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: "drop_suffix",
                      title: "Search wildcard (suffix like asterix*)",
                      type: CustomCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: "drop_icon",
                      title: "Name of the Office UI Fabric icon",
                      type: CustomCollectionFieldType.fabricIcon,
                      required: false
                    }
                  ],
                  disabled: false
                }),
                PropertyPaneLink('linkProperty', {
                  href: 'https://developer.microsoft.com/en-us/fluentui#/styles/web/icons',
                  text: 'For list of Fluent UI Icons visit here',
                  target: '_blank'}),
                PropertyPaneToggle('solution_blank',{
                  label:"Open in new tab?"
                }),
                PropertyPaneTextField('input_placeholder', {
                  label: "Input field text placeholder"
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneToggle('dropdown_display',{
                  label:"Include dropdown option?"
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneToggle('button_display',{
                  label:"Include button?"
                }),
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
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('label',{
                  text: "CSS styling"
                }),
                PropertyFieldMonacoEditor('search_CSS', {
                  key: 'search_CSS',
                  value: this.properties.search_CSS,
                  onChange: (code: string) => { this.properties.search_CSS = code; },
                  showMiniMap: true,
                  language:"css",
                  showLineNumbers:true,
                  theme: 'vs-dark'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
