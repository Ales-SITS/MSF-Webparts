import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
//import PersonWrapperL6 from './PersonWrapperL3'
import { SPFx, graphfi } from "@pnp/graph";

import Loader from './Visual/Loader'

export default function PersonWrapperL5 (props) {
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
        const clearResult = result.filter((user:any) => user.mail !== null)
        setData(clearResult)
          setIsLoading(false);
        }
        fetchData();
      }, [props.person]);

    return (
        <div className={styles.person_wrapper}>
            <Person 
                      className={styles.person5}               
                      personQuery={props.person}
                      view={ViewType.threelines} 
                      showPresence 
                      personCardInteraction={1}/>
                      {/*isLoading ? (
                        <div>Loading...</div> //Show a loading message or spinner
                      ) : ( <>
                                {data.map((user,idx) =>
                                <PersonWrapperL6  key={idx} person={user.mail} context={props.context}/>)}
                                </>)*/}
        </div>
       );
  }
