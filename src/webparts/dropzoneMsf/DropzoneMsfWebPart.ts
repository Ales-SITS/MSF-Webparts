import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneLabel
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
//General
  instructions: string;
  accepted: string;
  overwrite: boolean
  siteToggle: boolean;
//This site
  listObj: {id:string, title: string, url:string};
  folder: string;
  folderPath: string;
//External site
  eSiteUrl: string;
  eLibrary: string;
  eFolder: string;
//Visual
  fontSize: string;
  fileProgress: boolean;
  fileList: boolean;
  typeIcons: boolean
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
        context: this.context,
        //General
        instructions: this.properties.instructions,
        accepted: this.properties.accepted,
        overwrite: this.properties.overwrite,
        siteToggle: this.properties.siteToggle,
        //This site
        listObj: this.properties.listObj,
        folder: this.properties.folder,
        folderPath: this.properties.folderPath,
        //External site
        eSiteUrl: this.properties.eSiteUrl,
        eLibrary: this.properties.eLibrary,
        eFolder: this.properties.eFolder,
        //Visual
        fontSize: this.properties.fontSize,
        fileProgress: this.properties.fileProgress,
        fileList: this.properties.fileList,
        typeIcons: this.properties.typeIcons
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
    
    const targetSettings = this.properties.siteToggle ? 
    {
      groupName: "Target settings (External site)",
      isCollappsed: false,
      groupFields: [
        PropertyPaneToggle('siteToggle', {
          offText: "This site",
          onText: "External site",
          checked: false
        }),
        PropertyPaneTextField('eSiteUrl', {
          label: 'External site url'
        }),
        PropertyPaneTextField('eLibrary', {
          label: 'Library name',
          description: 'Use system internal name. Some system libraries like "Documents" have internal name "Shared documents" etc.'
        }),
        PropertyPaneTextField('eFolder', {
          label: 'Folder path',
          description: 'Write in this format: "folder1/folder2/folder3". If this field includes any text, it takes precedence over the select folder option above.'
        })
      ]
    } : 
    {
      groupName: "Target settings (This site)",
      isCollappsed: false,
      groupFields: [
        PropertyPaneToggle('siteToggle', {
          offText: "This site",
          onText: "External site",
          checked: false
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
          options: foldersOptions.filter(folder => folder.key !=="Forms")
        }),
        PropertyPaneLabel('emptyLabel', {
          text: "OR"
        }),
        PropertyPaneTextField('folderpath', {
          label: 'Folder path',
          description: 'Write in this format: "folder1/folder2/folder3". If this field includes any text, it takes precedence over the select folder option above.'
        })
      ]
    }


    return {
      pages: [
        {
          header: {
            description: 'Here you can change the general settings, select the target document library or change the drop zone visuals.'
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "General",
              isCollapsed:false,
              groupFields: [
                PropertyPaneTextField('instructions', {
                  label: 'Dropzone instructions',
                  multiline: true,
                  resizable: true,
                  rows: 2
                }),
                PropertyPaneTextField('accepted', {
                label: 'Accepted file types',
                description: 'Write in this format: "docx, doc, pdf". If empty, all file formats wil be accepted.'
                }),
                PropertyPaneToggle('overwrite', {
                  label:"Overwrite existing file?",
                  offText: "No",
                  onText: "Yes",
                  checked: false,
                })                
              ]
            },
            targetSettings,
            {
              groupName:"Visuals",
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField('fontSize', {
                  label: 'Instructions font-size (px)'
                  }),
                PropertyPaneToggle('fileProgress', {
                    label: "Upload progress bar",
                    offText: "Off",
                    onText: "On",
                    checked: false
                  }),
                PropertyPaneToggle('fileList', {
                    label: "Uploaded files list",
                    offText: "Off",
                    onText: "On",
                    checked: false
                }),
                PropertyPaneToggle('typeIcons', {
                  label: "Types icons",
                  offText: "Off",
                  onText: "On",
                  checked: false
              }),
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
