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
import { BaseClientSideWebPart} from '@microsoft/sp-webpart-base';
import DropzoneMsf from './components/DropzoneMsf';
import { IDropzoneMsfProps } from './components/IDropzoneMsfProps';
import { spfi,SPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/folders";

export interface IDropzoneMsfWebPartProps {
  instructions: string;
  listObj: {id:string, title: string, url:string};
  folder: string;
  folderpath: string;
  accepted: string
}

let foldersOptions:any[] = []
export default class DropzoneMsfWebPart extends BaseClientSideWebPart<IDropzoneMsfWebPartProps> {

  public async getFolders(): Promise<any> {
    const sp = spfi().using(SPFx(this.context));
    let Options = [{key:"", text:"", library: ""}]
    this.properties.listObj.id !== "" ? 
    await sp.web.lists.getById(this.properties.listObj.id).rootFolder.folders().then((fs)=>{
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
        listObj: this.properties.listObj,
        folder: this.properties.folder,
        folderpath: this.properties.folderpath,
        context: this.context,
        accepted: this.properties.accepted
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
    this.getFolders() 
    
    return {
      pages: [
        {
          header: {
            description: 'Here you can add dropzone instructions and select target document library. You can either choose from dropzone or if you have deeply nested folders, you can write a folder path instead.'
          },
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneTextField('instructions', {
                  label: 'Dropzone instructions'
                }),
                PropertyFieldListPicker('listObj', {
                  label: 'Select a library',
                  selectedList: this.properties.listObj,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  baseTemplate: 101,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  includeListTitleAndUrl: true,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneDropdown('folder', {
                  label:"Select folder",
                  options: foldersOptions.filter(folder => folder.key !=="Forms"),
                })
              ]
            },
            {
              groupName: "OR",
              groupFields: [
                PropertyPaneTextField('folderpath', {
                  label: 'Folder path',
                  description: 'First select a library then write you path in pattern "folder1/folder2/folder3". If this input field includes any text, it will take precedence over the select folder option.'
                }),
                PropertyPaneTextField('accepted', {
                  label: 'Accepted file types',
                  description: ''
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
