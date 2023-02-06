

import * as React from 'react';
import styles from './CTab.module.scss';
import { ICTabProps } from './ICTabProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { escape } from '@microsoft/sp-lodash-subset';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { Editor } from '@tinymce/tinymce-react';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';


import { Tabs, TabLink, TabContent } from './utilities/Tab/index';


export default class CTab extends React.Component<ICTabProps, {}> {
  constructor(props: ICTabProps) {
    super(props);
  }
  /* istanbul ignore next */
  public handleEditorChange = (e) => {
    /* istanbul ignore next */
    var id = e.target.id.split("-editor-")[1];
    //Save the content in properties 
    this.props.tabs[id].Content = e.target.getContent();
  }
 
  

  public render(): React.ReactElement<ICTabProps> {   
    console.log(this.props.tabs);
    if(this.props.displayMode === DisplayMode.Edit)  
    {
      return (
            <div>                 
              <div className={styles.webpartheader}>
                <div className={styles.webparttitle}>
                  <span role="heading" aria-level={2}>{this.props.title}</span>
                </div>
              </div>
                <Tabs className={styles.tabs} selectedTab={this.props.guid + "-editor-0"}>
                  <div className={styles.tablinks} tabIndex={0}>
                    {         
                      this.props.tabs.map((tab: any, tabindex: number) => {
                      return ( 
                        <TabLink className={styles.tablink} activeClassName={styles.tablinkactive} 
                                 id={this.props.guid + "-link-" + tabindex} 
                                 to={this.props.guid + "-editor-" + tabindex} key={this.props.guid + "-link-" + tabindex} ><span>{tab.Title}</span></TabLink>
                      );
                      })
                    }
                  </div>
                  <div className={styles.content}>
                      {         
                        this.props.tabs.map((tab: any, tabindex: number) => {
                        return ( 
                          <TabContent itemKey={this.props.guid + "-editor-" + tabindex} 
                                  key={this.props.guid + "-editor-" + tabindex} 
                                  for={this.props.guid + "-editor-" + tabindex} >
                            <Editor
                            id={this.props.guid + '-editor-' + tabindex}  
                            itemKey={this.props.guid + '-editor-' + tabindex} 
                            value={tab.Content}
                            init={{
                              content_style: "a {color:rgb(0,120,212) !important}",
                              plugins: 'link image table lists media code',                            
                              menubar: 'edit insert format table lists view',  // skip file
                              height : "500",
                              weight : "700",
                              toolbar: 'undo redo | bold italic underline| alignleft aligncenter alignright | numlist bullist | media | code',
                              table_responsive_width: true,
                              table_default_styles: {
                                'width': '100%',
                                'height': 'auto'
                              },
                              image_advtab: true,
                              style_formats: [
                                {title: 'Headings', items: [
                                    {title: 'Heading 1', format: 'h1'},
                                    {title: 'Heading 2', format: 'h2'},
                                    {title: 'Heading 3', format: 'h3'}
                                ]}]
                              
                            }}
                            onChange={this.handleEditorChange}
                        />
                          </TabContent>
                        );
                        })
                      }
                  </div>
                </Tabs>                
            </div>
        );
      }
     else 
      {
        return (
          <div>                 
              <div className={styles.webpartheader}>
                <div className={styles.webparttitle}>
                  <span role="heading" aria-level={2}>{this.props.title}</span>
                </div>
            </div>
            <Tabs className={styles.tabs} selectedTab={this.props.guid + "-editor-0"} >
                  <div className={styles.tablinks} >
                    {         
                      this.props.tabs.map((tab: any, tabindex: number) => {
                      return ( 
                        <TabLink className={styles.tablink} activeClassName={styles.tablinkactive}
                                id={this.props.guid + "-link-" + tabindex}
                                key={this.props.guid + "-link-" + tabindex}
                                 to={this.props.guid + "-editor-" + tabindex}><span>{tab.Title}</span></TabLink>
                      );
                      })
                    }
                  </div>
                  <div className={styles.content}>
                      {         
                        this.props.tabs.map((tab: any, tabindex: number) => {
                        return ( 
                          <TabContent key={this.props.guid + "-editor-" + tabindex} 
                                  for={this.props.guid + "-editor-" + tabindex} >
                            <div dangerouslySetInnerHTML={{__html:tab.Content}} id={this.props.guid} ></div>
                          </TabContent>
                        );
                        })
                      }
                  </div>
                </Tabs>          
            </div>
          );
      }
    }
  }
  