import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { PropertyFieldPeoplePicker, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
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

customElementHelper.withDisambiguation('bar');
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
      description: this.properties.description,
      topperson: this.properties.topperson,
      context: this.context
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldPeoplePicker('topperson', {
                  label: 'PropertyFieldPeoplePicker',
                  initialData: this.properties.topperson,
                  allowDuplicate: false,
                  multiSelect: false,
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context as any,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
