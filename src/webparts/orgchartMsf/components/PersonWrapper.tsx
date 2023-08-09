import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { IOrgchartMsfProps } from './IOrgchartMsfProps';
import { Person, People } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import PersonWrapperL2 from './PersonWrapperL2'
import { SPFx, graphfi } from "@pnp/graph";
import "@pnp/graph/users";


export default function PersonWrapper (props) {
    const [isLoading, setIsLoading] = useState(true);   
    const [data, setData] = useState([]);


    async function getInfo() {
        const graph = graphfi().using(SPFx(props.context))
        //const meData = await graph.me();
        const userData = await graph.users.getById(`${props.person}`).directReports()
        return await userData
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

    return (
        <div className={styles.person_wrapper}>
            <Person 
                      className={styles.person}               
                      personQuery={props.person}
                      view={ViewType.threelines} 
                      showPresence 
                      personCardInteraction={1}/>
              <div className={styles.persons_box}>
                {isLoading ? (
                <div>Loading...</div> //Show a loading message or spinner
                  ) : ( <>
                        {data.map((user,idx) => 
                        <PersonWrapperL2  key={idx} person={user.mail} context={props.context}/>)}
                </>)}
              </div>
             
        </div>
       );
  }
