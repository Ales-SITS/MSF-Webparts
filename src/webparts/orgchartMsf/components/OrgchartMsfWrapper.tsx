import * as React from 'react';
import { IOrgchartMsfProps } from './IOrgchartMsfProps';
import OrgchartMsf from './OrgchartMsf';

export default class OrgchartMsfWrapper extends React.Component<IOrgchartMsfProps, {}> {
  public render(): React.ReactElement<IOrgchartMsfProps> {

    return (
      <section>
        {this.props.topperson.length === 0 ? null : <OrgchartMsf details={this.props}/>}
      </section>
    );
  }
}
