import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'OrgchartMsfWebPartStrings';
import { IOrgchartMsfProps } from './components/IOrgchartMsfProps';

//Graph toolkit
import { Providers } from '@microsoft/mgt-element/dist/es6/providers/Providers';
import { customElementHelper } from '@microsoft/mgt-element/dist/es6/components/customElementHelper';
import { SharePointProvider } from '@microsoft/mgt-sharepoint-provider/dist/es6/SharePointProvider';
import { lazyLoadComponent } from '@microsoft/mgt-spfx-utils';



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
    const element = lazyLoadComponent(OrgchartMsfWrapper, { 
      charttitle: this.properties.charttitle,
      topperson: this.properties.topperson,
      searchfield: this.properties.searchfield,
      context: this.context,
      widedisplay:this.properties.widedisplay,
      color: this.properties.color
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
                  label: 'Default chart title'
                }),
                PropertyFieldPeoplePicker('topperson', {
                  label: 'Select top person',
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
                PropertyPaneToggle('searchfield',{
                  label:"Include people search field?"
                }),
              ]
            },
            {
              groupName: 'Visual',
              groupFields: [
                PropertyPaneToggle('widedisplay',{
                  label:"Set wide display as default?"
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
