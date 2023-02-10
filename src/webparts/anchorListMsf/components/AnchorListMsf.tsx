import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './AnchorListMsf.module.scss';
import { IAnchorListMsfProps } from './IAnchorListMsfProps';
import  AnchorLink from './AnchorLink'
import  AnchorList from './AnchorList'


 class AnchorListMsf extends React.Component<IAnchorListMsfProps, {}> {
  public render(): React.ReactElement<IAnchorListMsfProps> {

    return (
      <AnchorList details={this.props}/>
    );
  }
}

export default AnchorListMsf