import * as React from 'react';
import { IRedirectMsfProps } from './IRedirectMsfProps';
import RedirectMsf from './RedirectMsf'

 class RedirectMsfHandler extends React.Component<IRedirectMsfProps, {}> {
  public render(): React.ReactElement<IRedirectMsfProps> {

    return (
      <RedirectMsf details={this.props}/>
    );
  }
}

export default RedirectMsfHandler