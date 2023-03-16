import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
export interface IDropzoneMsfProps {
  digest:string;
  context:IWebPartContext;
  message: string;
  listName:string;
  folderName:string;
  fileTypes:string;
  queryString:string;
  uploadFilesTo:string;
}
