import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import PersonWrapperL4 from './PersonWrapperL4'
import { SPFx, graphfi } from "@pnp/graph";

import { Callout} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';

export default function PersonWrapperL3 (props) {
    const [isLoading, setIsLoading] = useState(true);   
    const [data, setData] = useState([]);
    const [visibleCard3, setVisibleCard3] = useState(false)  

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

    const personId3 = useId('callout-personL3');



    return (
        <div className={`
              ${styles['person_wrapper']} 
              ${styles['person_wrapper3']}         
            `} 
            onMouseLeave={()=>setVisibleCard3(false)}>
            <Person   onClick={()=>managerHandler(props.person)}
                      className={styles.person3}               
                      personQuery={props.person}
                      view={ViewType.threelines} 
                      showPresence
                      id={personId3}
                      onMouseEnter={()=>setVisibleCard3(true)} 
                      
                      />
            {visibleCard3 &&
                      <Callout
                            role="dialog"
                            gapSpace={0}
                            setInitialFocus
                            target={`#${personId3}`}
                            onMouseEnter={()=>setVisibleCard3(true)}
                            onMouseLeave={()=>setVisibleCard3(false)}
                                >
                                  <PersonCard personQuery={props.person}/>
                        </Callout>}
          
             <div className={styles.persons_box}>
                {isLoading ? (
                <div>Loading...</div> //Show a loading message or spinner
                ) : ( <>
                        {data.length < 1 ? null  : data.map((user,idx) =>
                        
                        <PersonWrapperL4  key={idx} person={user.mail} context={props.context} onSelectManager={managerHandler}/>
                         
                        )}
                    </>)}
             </div>
        </div>
       );
  }
