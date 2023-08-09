import * as React from 'react';
import { IOrgchartMsfProps } from './IOrgchartMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import OrgchartMsf from './OrgchartMsf';

export default class OrgchartMsfWrapper extends React.Component<IOrgchartMsfProps, {}> {
  public render(): React.ReactElement<IOrgchartMsfProps> {
    const {
      description,
      topperson,
      context
    } = this.props;

  
    return (
      <section>
        {topperson.length === 0 ? null : <OrgchartMsf details={this.props}/>}
      </section>
    );
  }
}