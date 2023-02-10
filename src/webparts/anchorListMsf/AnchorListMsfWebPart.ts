import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AnchorListMsfWebPartStrings';
import AnchorListMsf from './components/AnchorListMsf';

import { IAnchorListMsfProps } from './components/IAnchorListMsfProps';

export interface IAnchorListMsfWebPartProps {
  AnchorListTitle: string;
  AnchorListSymbol: string;
}

export default class AnchorListMsfWebPart extends BaseClientSideWebPart<IAnchorListMsfWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAnchorListMsfProps> = React.createElement(
      AnchorListMsf,
      {
        AnchorListTitle: this.properties.AnchorListTitle,
        AnchorListSymbol: this.properties.AnchorListSymbol
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }


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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Anchor list settings",
              groupFields: [
                PropertyPaneTextField('AnchorListTitle', {
                  label: "Anchor List Title"
                }),
                PropertyPaneChoiceGroup("AnchorListSymbol", {
                  label: "Preppend with",
                  options: [
                    { key: "⚬", text: "circle ⚬" },
                    { key: "●", text: "fullcircle ●" },
                    { key: "▪", text: "square ▪" },
                    { key: "▸", text: "arrow ▸" },
                    { key: "", text: "none" }
                  ]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
