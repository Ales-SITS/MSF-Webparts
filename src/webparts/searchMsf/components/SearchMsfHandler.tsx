import * as React from 'react';
import { ISearchMsfProps } from './ISearchMsfProps';
import SearchMsf from './SearchMsf'

 class SearchMsfHandler extends React.Component<ISearchMsfProps, {}> {
  public render(): React.ReactElement<ISearchMsfProps> {

    return (
      <SearchMsf details={this.props}/>
    );
  }
}

export default SearchMsfHandler