import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import styles from './OrgchartMsf.module.scss';
import { IOrgchartMsfProps } from './IOrgchartMsfProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import {  PeoplePicker } from '@microsoft/mgt-react';
import { ViewType } from '@microsoft/mgt-spfx';
import TopPersonWrapper from './TopPersonWrapper';
import { SPFx, graphfi } from "@pnp/graph";
import "@pnp/graph/users";
import PersonWrapper from './PersonWrapper'



export default function OrgchartMsf (props) {
    const {
      description,
      topperson,
      context
    } = props.details;
    
    const dragger = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;; 
    const { events } = useDraggable(dragger, {
      applyRubberBandEffect: false, // activate rubber band effect
    }); 

    const [top_person,setTop_person] = useState(topperson[0].email)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [wide,setWide] = useState(false)
    const wideHandler = () => {
        setWide(!wide)
    }


    async function getInfo() {
        const graph = graphfi().using(SPFx(context))
        //const meData = await graph.me();
        const userData = await graph.users.getById(`${top_person}`).directReports()
        return await userData
    }
  
     const onChangePeople = (e) => {
        setTop_person(null)  
        e.detail[0] === undefined? setTop_person(topperson[0].email) : setTop_person(e.detail[0].userPrincipalName)     
    }
   
    useEffect(()=>{
        setTop_person(topperson[0].email)
    },[props.details])
  

    useEffect(() => { 
      async function fetchData() {
        setIsLoading(true)
        const result = await getInfo();
        setData(result);
        setIsLoading(false);
      }
      fetchData();
    }, [top_person]);

console.log(data)

    return (
        <div className={wide ? styles.orgchart_wide : styles.orgchart_standard} {...events} ref={dragger}>
          <div>
            <h1>{props.description}</h1>
            <button onClick={wideHandler}>WIDE</button>

            {topperson === undefined ? null : 
            <>
              <PeoplePicker selectionMode="single"  selectionChanged={onChangePeople}/>
              {top_person === null ? null : <TopPersonWrapper personselected={top_person} peoplearray={data}/>}
            </>}
          </div>
          <div className={styles.orgchar_l1_connector}>{""}</div>
          <div className={styles.orgchar_l1_wrapper} >
            {isLoading ? (
              <div>Loading...</div> // Show a loading message or spinner
            ) : (
              <>
                {data.map((user,idx) =>
                      <PersonWrapper  key={idx} person={user.mail} context={context}/>)}
                      </>
            )}
          </div>
         </div>
    );
  }
