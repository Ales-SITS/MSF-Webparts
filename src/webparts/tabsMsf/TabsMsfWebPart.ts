import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version} from '@microsoft/sp-core-library';
import {
  IWebPartPropertiesMetadata,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import {
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';

import * as strings from 'TabsMsfWebPartStrings';
import Tab from './components/CTab';
import { ICTabProps } from './components/ICTabProps';
import Accordion from './components/CAccordion';
import { ICAccordionProps } from './components/ICAccordionProps';
import { IPropertyPaneConfiguration, PropertyPaneTextField, BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import 'tinymce';
export interface ITabsMsfWebPartProps {
  tabs: any[]; 
  type: string;
  title: string;
  accordion:boolean;
  tabContent: string;
}

export default class TabsMsfWebPart extends BaseClientSideWebPart<ITabsMsfWebPartProps> {
  private propertyFieldCollectionData;
  private customCollectionFieldType;
  private guid: string;
  private isMobile: boolean;


  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'title': { isSearchablePlainText: true },
      'tabContent': { isHtmlString: true }
    };
  }

  public constructor(context?: WebPartContext) {
    super();

    this.guid = this.getGuid();

    this.isMobile = this.detectmob();

    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }
  

  public render(): void {

    this.properties.tabContent = "";
    this.properties.tabs.map((tab: any, tabindex: number) => {
      this.properties.tabContent += tab.Title + "," + tab.Content + "|";
    });
    
    const elementTab: React.ReactElement<ICTabProps > = React.createElement(
      Tab,
      {        
        tabs: this.properties.tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title:this.properties.title
      }
    );
    const elementAccordion: React.ReactElement<ICAccordionProps > = React.createElement(
      Accordion,
      {        
        tabs: this.properties.tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title: this.properties.title,
        accordion:this.properties.accordion
      }
    );
    if(this.isMobile)
    {
      ReactDom.render(elementAccordion, this.domElement);
    }
    else 
    {
      if(this.properties.type == "Accordion")
      {
        ReactDom.render(elementAccordion, this.domElement);
      }
      else
      {
        ReactDom.render(elementTab, this.domElement);
      }
    }
    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.1');
  }

  private getGuid(): string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  private detectmob(): boolean {
    if(window.innerWidth <= 480) {
      return true;
    } else {
      return false;
    }
 }


  private s4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }


  protected async loadPropertyPaneResources(): Promise<void> {

    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import (
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );
    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: `In this webpart you can choose between 2 views - Tabs and Accordion. Every tab/accordion has it's own editor where you can add text but also media and html code (with inline CSS). To display SPO lists and document libraties use iframe tag as <iframe style="width: 700px; height: 500px;" src="list url" frameborder="0"></iframe>`
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneDropdown('type', {
                  label: strings.Type,
                  disabled: false,                   
                  options: [
                    {key: 'Accordion', text: 'Accordion'},
                    {key: 'Tab', text: 'Tab'}
                  ]
                }),  
                this.propertyFieldCollectionData("tabs", {
                  key: "tabs",
                  panelHeader: strings.ManageAccordion,
                  manageBtnLabel: strings.ManageAccordion,
                  value: this.properties.tabs,
                  enableSorting: false,
                  fields: [
                    {
                      id: "Title",
                      title: strings.TitleFieldLabel,
                      type: this.customCollectionFieldType.string,
                      required: true
                    }
                  ]
                }),                           
              ],             
            }         
          ]
        }
      ]
    };
  }
}