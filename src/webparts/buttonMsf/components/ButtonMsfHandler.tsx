import * as React from 'react';
import { IButtonMsfProps } from '../ButtonMsfWebPart';
import ButtonMsf from './ButtonMsf'

 class ButtonMsfHandler extends React.Component<IButtonMsfProps, {}> {
  public render(): React.ReactElement<IButtonMsfProps> {

    return (
      <ButtonMsf details={this.props}/>
    );
  }
}

export default ButtonMsfHandler