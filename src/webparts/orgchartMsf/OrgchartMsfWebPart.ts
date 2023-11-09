import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import { IOrgchartMsfProps } from './components/IOrgchartMsfProps';

//Graph toolkit
import { Providers } from '@microsoft/mgt-element/dist/es6/providers/Providers';
import { customElementHelper } from '@microsoft/mgt-element/dist/es6/components/customElementHelper';
import { SharePointProvider } from '@microsoft/mgt-sharepoint-provider/dist/es6/SharePointProvider';
import { lazyLoadComponent } from '@microsoft/mgt-spfx-utils';

//import OrgchartMsfWrapper from './components/OrgchartMsfWrapper';

const OrgchartMsfWrapper = React.lazy(() => import('./components/OrgchartMsfWrapper'))

customElementHelper.withDisambiguation('orgcharmsf');
export default class OrgchartMsfWebPart extends BaseClientSideWebPart<IOrgchartMsfProps> {

  protected async onInit(): Promise<void> {
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }

    //return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  public render(): void {
    const element = lazyLoadComponent(
      OrgchartMsfWrapper,
      { 
      charttitle: this.properties.charttitle,
      topperson: this.properties.topperson,
      searchfield: this.properties.searchfield,
      context: this.context,
      widedisplay:this.properties.widedisplay,
      color: this.properties.color,
      assistant: this.properties.assistant,
      userfilter: this.properties.userfilter,
      maxlevel: this.properties.maxlevel,
      rules: this.properties.rules
     });
   
    ReactDom.render(element, this.domElement);
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'This webpart is using Graph toolkit components. To make it running, install also Microsoft Graph Toolkit v2 for SPFx from the tennant app catalogue!'
          },
          groups: [
            {
              groupName: 'General',
              groupFields: [
                PropertyPaneTextField('charttitle', {
                  label: 'Orgchart title'
                }),
                PropertyFieldPeoplePicker('topperson', {
                  label: 'Select the top person',
                  initialData: this.properties.topperson,
                  allowDuplicate: false,
                  multiSelect: false,
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context as any,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId',        
                }),
                PropertyPaneSlider('maxlevel',{  
                  label:"Levels",  
                  min:1,  
                  max:5,  
                  value:5,  
                  showValue:true,  
                  step:1
                }),
                PropertyPaneTextField('userfilter', {
                  label: 'Filters',
                  rows: 2,
                  resizable: true,
                  description: "Excludes user if their email address includes the text you enter. Multiple filters possible (separate by semicolon';')"
                }),
              ]
            },
            {
              groupName: 'Visual',
              groupFields: [
                PropertyPaneToggle('widedisplay',{
                  label:"Set wide display as default?"
                }),
                PropertyPaneToggle('searchfield',{
                  label:"Include people search field?"
                }),
                PropertyPaneToggle('assistant',{
                  label:"Special assistant box?",
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Background color',
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
                PropertyFieldCollectionData("rules", {
                      key: "rules",
                      label: "Rules",
                      panelHeader: "Visual rule",
                      manageBtnLabel: "Manage rules",
                      value: this.properties.rules,
                      fields: [
                          {
                            id: "rule_type",
                            title: "Rule type",
                            type: CustomCollectionFieldType.dropdown,
                            options: [
                              {
                                key: "mail",
                                text: "Email includes"
                              },
                              {
                                key: "job",
                                text: "Job title includes"
                              }
                            ],
                            required: true
                          },
                        {
                          id: "rule_text",
                          title: "Text",
                          type: CustomCollectionFieldType.string,
                          required: true
                        },
                        {
                          id: "rule_bg",
                          title: "Background color",
                          type: CustomCollectionFieldType.color
                        },
                        {
                          id: "rule_border",
                          title: "Border color",
                          type: CustomCollectionFieldType.color
                        },
                        {
                          id: "rule_legend",
                          title: "Legent text",
                          type: CustomCollectionFieldType.string,
                        },
                      ],
                      disabled: false
                    })
                  ]
                 }
              ]          
        }
      ]
    };
  }
}
