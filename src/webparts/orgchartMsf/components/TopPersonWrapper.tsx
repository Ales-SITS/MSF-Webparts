import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { IOrgchartMsfProps } from './IOrgchartMsfProps';
import { Person, People } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';


export default function TopPersonWrapper (props) {
    const data = props.peoplearray
    console.log(data)
    return (
        <div className={styles.top_person }>
        <Person 
        personQuery={props.personselected} 
        view={ViewType.threelines} 
        showPresence 
        personCardInteraction={1}/>
        </div>
       );
  }
