import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import PersonWrapperL2 from './PersonWrapperL2'
import { SPFx, graphfi } from "@pnp/graph";

import { Callout } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import "@pnp/graph/users";


export default function PersonWrapper (props) {

    const pos = props.position

    const [isLoading, setIsLoading] = useState(true);
    const [visibleCard, setVisibleCard] = useState(false)  
    const [data, setData] = useState([]);
  
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
          setData(result);
          setIsLoading(false);
        }
        fetchData();
      }, [props.person]);

    //Callout
    const personId = useId('callout-person');

    return (  
        <div className={`
        ${styles['person_wrapper']} 
        ${styles['person_wrapper1']} 
        ${pos==='first' ? styles['person_wrapper-first'] :
          pos==='last' ?  styles['person_wrapper-last'] :
          styles['person_wrapper-middle']
      }
        
        `}
        onMouseLeave={()=>setVisibleCard(false)}
        >
      
            <Person   onClick={()=>managerHandler(props.person)}
                      className={styles.person1}               
                      personQuery={props.person}
                      view={ViewType.threelines} 
                      showPresence     
                      id={personId}
                      onMouseEnter={()=>setVisibleCard(true)} 
                      
                     />
            {visibleCard &&
                  <Callout
                      role="dialog"
                      gapSpace={0}
                      setInitialFocus
                      target={`#${personId}`}
                      onMouseEnter={()=>setVisibleCard(true)} 
                      onMouseLeave={()=>setVisibleCard(false)}
                    >
                      <PersonCard personQuery={props.person}/>
                    </Callout>
              }
               
              <div className={styles.persons_box}>
                  {isLoading ? (
                  <div>Loading...</div> //Show a loading message or spinner
                    ) : ( <>
                          {data.length < 1 ? null  : data.map((user,idx) => 
                         
                          <PersonWrapperL2 key={idx} person={user.mail} context={props.context} onSelectManager={managerHandler}/>
                         
                          )}
                  </>)}
              </div>
        </div>
       );
  }
