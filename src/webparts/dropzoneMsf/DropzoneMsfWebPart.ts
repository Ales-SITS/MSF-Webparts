import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { IDigestCache, DigestCache } from '@microsoft/sp-http';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'DropzoneMsfWebPartStrings';
import DropzoneMsf from './components/DropzoneMsf';
import { IDropzoneMsfProps } from './components/IDropzoneMsfProps';

export interface IDropzoneMsfWebPartProps {
  instructions: string;
  listName: string;
}

let foldersOptions:any[] = []
export default class DropzoneMsfWebPart extends BaseClientSideWebPart<IDropzoneMsfWebPartProps> {

  //Custom fce
  public async getFolders(): Promise<any> {
    console.log("***INITIALIZED***")
    const sp = spfi().using(SPFx(this.context));
    let Options = [{key:"", text:"", library: ""}]
    this.properties.listName !== "" ? 
    await sp.web.lists.getById(this.properties.listName).rootFolder.folders().then((fs)=>{
      if (Array.isArray(fs)){
        fs.map((folder) => { 
          Options.push({key:folder.Name, text:folder.Name, library: folder.ServerRelativeUrl})
        })}
      }) : console.log("***SKIPPED***")


    if (JSON.stringify(foldersOptions) !== JSON.stringify(Options)) {
      foldersOptions = Options
      this.context.propertyPane.refresh()

    } 
  }

  public reloader(folder): any {

  }



  public digest: string = "";
  
  public render(): void {
    const element: React.ReactElement<IDropzoneMsfProps> = React.createElement(
      DropzoneMsf,
      {
        instructions: this.properties.instructions,
        listName: this.properties.listName,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
    this.digest = await digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                }),
                PropertyFieldListPicker('listName', {
                  label: 'Select a list or library',
                  selectedList: this.properties.listName,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneDropdown('folderName', {
                  label:"Select folder",
                  options: foldersOptions.filter(folder => folder.key !=="Forms"),
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

}
