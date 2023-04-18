import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'DropzoneMsfWebPartStrings';
import DropzoneMsf from './components/DropzoneMsf';
import { IDropzoneMsfProps } from './components/IDropzoneMsfProps';

export interface IDropzoneMsfWebPartProps {
  instructions: string;
}

export default class DropzoneMsfWebPart extends BaseClientSideWebPart<IDropzoneMsfWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDropzoneMsfProps> = React.createElement(
      DropzoneMsf,
      {
        instructions: this.properties.instructions,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /*
  protected onInit(): Promise<void> {
 
  }
*/


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
            description: 'Placeholder'
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('instructions', {
                  label: 'Dropzone instructions'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
