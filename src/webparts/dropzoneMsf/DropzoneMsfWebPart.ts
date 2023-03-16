import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { IDigestCache, DigestCache } from '@microsoft/sp-http';
import { spfi,SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import * as strings from 'DropzoneMsfWebPartStrings';
import DropzoneMsf from './components/DropzoneMsf';
import { IDropzoneMsfProps } from './components/IDropzoneMsfProps';
import * as loader from '@microsoft/sp-loader';
import { PropertyFieldListPicker } from './propertyFields/listPicker/PropertyFieldListPicker';
import { PropertyFieldListPickerOrderBy } from './propertyFields/listPicker/IPropertyFieldListPicker';
import { 
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import "./filepicker.css"
import "./dropzone.css"

export interface IDropzoneMsfWebPartProps {
  message: string;
  listName:string;
  folderName: string;
  fileTypes:string;
  queryString:string;
  uploadFilesTo:string;
}

let foldersOptions:any[] = []

export default class DropzoneMsfWebPart extends BaseClientSideWebPart<IDropzoneMsfWebPartProps> {
  

  public digest:string="";
  public constructor(context:IWebPartContext){
    super();    
    loader.SPComponentLoader.loadCss('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
  }

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

  protected async onInit(): Promise<void> {
    
  
    await this.getFolders()

    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
      digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {
        // use the digest here
        this.digest=digest;
        resolve();
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IDropzoneMsfProps > = React.createElement(
      DropzoneMsf,
      {
        digest:this.digest,
        context:this.context,
        message: this.properties.message,
        listName:this.properties.listName,
        folderName:this.properties.folderName,
        fileTypes:this.properties.fileTypes,
        queryString:this.properties.queryString,
        uploadFilesTo:this.properties.uploadFilesTo
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    
    this.getFolders() 

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
                PropertyPaneTextField('message',{
                  label:'Add an explenation or a message',                  
                }),
                PropertyFieldListPicker('listName', {
                  label: 'Select a library',
                  selectedList: this.properties.listName,
                  includeHidden: false,
                  baseTemplate: 101,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  // multiSelect: false,
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
                }),
                PropertyPaneTextField('fileTypes',{
                  label:'File Types (use , as seperator)',                  
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
