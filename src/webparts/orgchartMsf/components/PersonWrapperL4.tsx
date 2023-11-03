import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person} from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import PersonWrapperL5 from './PersonWrapperL5'
import { SPFx, graphfi } from "@pnp/graph";

import { Callout} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';

import Loader from './Visual/Loader'

export default function PersonWrapperL4 (props) {
    const [isLoading, setIsLoading] = useState(true);   
    const [data, setData] = useState([]);
    const [visibleCard4, setVisibleCard4] = useState(false)  

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
        setData(clearResult)
          setIsLoading(false);
        }
        fetchData();
      }, [props.person]);

      const personId4 = useId('callout-personL4');

      

    return (
        <div className={`
            ${styles['person_wrapper']} 
            ${styles['person_wrapper4']}         
            `}
            onMouseLeave={()=>setVisibleCard4(false)}
        >
            <Person   
                      onClick={()=>managerHandler(props.person)}
                      className={styles.person4}               
                      personQuery={props.person}
                      view={ViewType.threelines} 
                      id={personId4}
                      showPresence 
                    />
                     {visibleCard4 &&
                      <Callout
                            role="dialog"
                            gapSpace={0}
                            setInitialFocus
                            target={`#${personId4}`}
                            onMouseEnter={()=>setVisibleCard4(true)}
                            onMouseLeave={()=>setVisibleCard4(false)}
                                >
                                  <PersonCard personQuery={props.person}/>
                        </Callout>}
           
             <div className={styles.persons_box}>
             {isLoading ? (
               <Loader/>
            ) : ( <>
                      {data.length < 1 ? null  : data.map((user,idx) =>
                       
                      <PersonWrapperL5  key={idx} person={user.mail} context={props.context}/>
                      
                      )}
                </>)}
            </div>
            
          </div>
                    
       );
  }
