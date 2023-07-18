import * as React from 'react';
import styles from './OrgchartMsf.module.scss';
import { IOrgchartMsfProps } from './IOrgchartMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';


export default class OrgchartMsf extends React.Component<IOrgchartMsfProps, {}> {
  public render(): React.ReactElement<IOrgchartMsfProps> {
    const {
      description,
      topperson
    } = this.props;

    //console.log(topperson)
 

    return (
      <section>
        <div className={styles.welcome}>
          <h1><strong>{escape(description)}</strong></h1>    
        <div>
            {topperson === undefined? null : 
            <>
             
              <Person personQuery={topperson[0].email} view={ViewType.fourlines} showPresence personCardInteraction={1}>
              </Person>
            </>}
          </div>
        </div>
      </section>
    );
  }
}
