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

import Loader from './Visual/Loader'

export default function PersonWrapper (props) {

    const pos = props.position
    const job = props.job
    const highlighted = props.highlighted
    const filter_array = props.filter_array

    const [isLoading, setIsLoading] = useState(true);
    const [visibleCard, setVisibleCard] = useState(false)  
    const [data, setData] = useState([]);
  
    async function getInfo() {
        const graph = graphfi().using(SPFx(props.context))
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

    //Callout
    const personId = useId('callout-person');

    const filtered_data = filter_array.length < 1 ? 
                          data :
                          data.filter(user => {
                            return filter_array?.every(filterStr => !user.userPrincipalName?.toLowerCase().includes(filterStr));
                          })

     console.log(job)
     console.log(highlighted)       

    return (  
        <div className={`
          ${styles['person_wrapper']} 
          ${styles['person_wrapper1']} 
          ${pos==='first' ? styles['person_wrapper_first'] :
            pos==='last' ?  styles['person_wrapper_last'] :
            styles['person_wrapper_middle']} 
          `}
        onMouseLeave={()=>setVisibleCard(false)}
        style={{backgroundColor: job?.toLowerCase().includes(`${highlighted ? highlighted.toLowerCase() : "Darth Vader"}`) ? "#fff4b8" : 'white'}}
        > 
            <Person   
                onClick={()=>managerHandler(props.person)}
                personQuery={props.person}
                className={styles.person1}               
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
                  <Loader/> //Show a loading message or spinner
                    ) : ( <>
                          {filtered_data.length < 1 ? null  : filtered_data.map((user,idx) =>                          
                          <PersonWrapperL2 
                          key={idx} 
                          person={user.mail} 
                          context={props.context} 
                          onSelectManager={managerHandler}
                          filter_array={filter_array}
                          />                   
                          )}
                  </>)}
              </div>
        </div>
       );
  }
