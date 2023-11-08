import * as React from 'react';
//import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';

import "@pnp/graph/users";

export default function TopPersonWrapper (props) {
    
    const managerHandler = (man) => {
        props.onSelectManager(man)
      }
  

    return (
        <div className={styles['top_person']}>
                  <div className={styles['top_person_manager']}>
                    <Person 
                      className={`${styles['person']}`}               
                      personQuery={props.manager}
                      view={ViewType.oneline} 
                      showPresence 
                      personCardInteraction={0}
                      onClick={()=>managerHandler(props.manager)}
                      />
                  </div>     
                    <Person
                    className={`${styles['person']} ${styles['personTOP']}`}    
                    personQuery={props.personselected} 
                    view={ViewType.fourlines} 
                    showPresence 
                    personCardInteraction={1}/>
        </div>           
       );
  }
