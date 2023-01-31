import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './WelcomeUserMsfWebPart.module.scss';


export interface IWelcomeUserMsfWebPartProps {
  TextBefore: string;
  TextAfter: string;
  TextSize: string;
  TextAlign: string;
}

export default class WelcomeUserMsfWebPart extends BaseClientSideWebPart<IWelcomeUserMsfWebPartProps> {

  private _isDarkTheme: boolean = false;
  
  public render(): void {
    this.domElement.innerHTML = `
      <span class="${styles.welcome}" style="text-align:${escape(this.properties.TextAlign)}; font-size: ${escape(this.properties.TextSize)}px;">
        <h2>${escape(this.properties.TextBefore)}${escape(this.context.pageContext.user.displayName)}${escape(this.properties.TextAfter)}</h2> 
      </span>
    `;
  }


 
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Here you can customize the welcome message. You can add text before and after the user's name, you can also align the text. As default no space is between the name and text parts, in can simply added in the text fields."
          },
          groups: [
            {
              groupName: "Text settings",
              groupFields: [
                PropertyPaneTextField('TextBefore', {
                  label: "Text before the name:"
                }),
                PropertyPaneTextField('TextAfter', {
                  label: "Text after the name:"
                })
              ]
            },
            {
              groupName: "Visual settings",
              groupFields: [
                PropertyPaneTextField('TextSize', {
                  label: "Set text size (px)"
                }),
                PropertyPaneChoiceGroup("TextAlign", {
                  label: "Text alignment",
                  options: [
                    { key: "start", text: "Left" },
                    { key: "center", text: "Center" },
                    { key: "end", text: "Right" }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
