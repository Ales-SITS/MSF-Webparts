import * as React from 'react';
import styles from './PersonMsf.module.scss';
import { IPersonMsfProps } from './IPersonMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PersonMsf extends React.Component<IPersonMsfProps, {}> {
  public render(): React.ReactElement<IPersonMsfProps> {
    const {
      description,
    } = this.props;

    return (
      <section className={styles.personMsf}>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
      </section>
    );
  }
}
