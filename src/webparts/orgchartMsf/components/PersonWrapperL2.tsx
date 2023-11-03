import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import PersonWrapperL3 from './PersonWrapperL3'
import { SPFx, graphfi } from "@pnp/graph";

import { Callout} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';

import Loader from './Visual/Loader'

export default function PersonWrapperL2 (props) {

    const filter_array = props.filter_array
    const [isLoading, setIsLoading] = useState(true);   
    const [data, setData] = useState([]);
    const [visibleCard2, setVisibleCard2] = useState(false)  
    
    async function getInfo() {
        const graph = graphfi().using(SPFx(props.context))
        //const meData = await graph.me();
        const userData = await graph.users.getById(`${props.person}`).directReports()
        return await userData
    }

    const managerHandler = (manager) => {
        props.onSelectManager(manager)
      }

    useEffect(() => { 
        async function fetchData() {
        setIsLoading(true)
          const result = await getInfo();
          const clearResult = result.filter((user:any) => user.mail !== null)
          setData(clearResult);
          setIsLoading(false);
        }
        fetchData();
      }, [props.person]);

    const personId2 = useId('callout-personL2');

    const filtered_data = filter_array.length < 1 ? 
          data :
          data.filter(user => {
            return filter_array?.every(filterStr => !user.userPrincipalName?.toLowerCase().includes(filterStr));
          })

    return (
        <div className={`
            ${styles['person_wrapper']} 
            ${styles['person_wrapper2']}         
            `}
            onMouseLeave={()=>setVisibleCard2(false)}>
            <Person   onClick={()=>managerHandler(props.person)}
                      className={styles.person2}               
                      personQuery={props.person}
                      view={ViewType.threelines} 
                      showPresence 
                      id={personId2}
                      onMouseEnter={()=>setVisibleCard2(true)} 
                        />
                {visibleCard2 &&
                  <Callout
                      role="dialog"
                      gapSpace={0}
                      setInitialFocus
                      target={`#${personId2}`}
                      onMouseEnter={()=>setVisibleCard2(true)}
                      onMouseLeave={()=>setVisibleCard2(false)}
                    >
                      <PersonCard personQuery={props.person}/>
                    </Callout>}
               
                <div className={styles.persons_box}>
                    {isLoading ? (
                     <Loader/> //Show a loading message or spinner
                    ) : ( <>
                            {filtered_data.length < 1 ? null : data.map((user,idx) =>
                            <PersonWrapperL3  key={idx} person={user.mail} context={props.context} onSelectManager={managerHandler}/>
                            )}
                        </>)}
                </div>
            </div>
       );
  }
