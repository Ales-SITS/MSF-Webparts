import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';

import "@pnp/graph/users";

export default function TopPersonWrapper (props) {
  
    const [managerI,setManagerI] = useState(props.manager)
    const [managerII,setManagerII] = useState(props.personselected)
    
    const managerHandler = () => {
        setManagerI(null)
        setManagerII(null)
        props.onSelectManager(managerI)
      }
  
    useEffect(()=>{
        setManagerI(props.manager)
        setManagerII(props.managerII)
    },[props])


    return (
        <div className={styles['top_person']}>
                    <div className={styles['top_person-manager']}>
                    <Person 
                      className={`${styles['person']}`}               
                      personQuery={managerI}
                      view={ViewType.oneline} 
                      showPresence 
                      personCardInteraction={0}
                      onClick={managerHandler}
                      />
                    </div>     
                    <Person
                    className={`${styles['person']} ${styles['personTOP']}`}    
                    personQuery={managerII} 
                    view={ViewType.fourlines} 
                    showPresence 
                    personCardInteraction={1}/>
        </div>
                 
       );
  }
