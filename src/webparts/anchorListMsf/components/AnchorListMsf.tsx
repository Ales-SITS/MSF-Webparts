import * as React from 'react';
import { IAnchorListMsfProps } from './IAnchorListMsfProps';
import  AnchorList from './AnchorList'


 class AnchorListMsf extends React.Component<IAnchorListMsfProps, {}> {
  public render(): React.ReactElement<IAnchorListMsfProps> {

    return (
      <AnchorList details={this.props}/>
    );
  }
}

export default AnchorListMsf