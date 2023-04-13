import * as React from 'react';
import { IButtoncssMsfProps } from '../ButtoncssMsfWebPart';
import ButtoncssMsf from './ButtoncssMsf'

 class ButtoncssMsfHandler extends React.Component<IButtoncssMsfProps, {}> {
  public render(): React.ReactElement<IButtoncssMsfProps> {

    return (
      <ButtoncssMsf details={this.props}/>
    );
  }
}

export default ButtoncssMsfHandler