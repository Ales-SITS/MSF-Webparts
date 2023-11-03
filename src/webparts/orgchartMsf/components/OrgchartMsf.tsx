import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import styles from './OrgchartMsf.module.scss';
import {  PeoplePicker } from '@microsoft/mgt-react';
import TopPersonWrapper from './TopPersonWrapper';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import { SPFx, graphfi } from "@pnp/graph";
import "@pnp/graph/users";
import PersonWrapper from './PersonWrapper'

import Loader from './Visual/Loader'

export default function OrgchartMsf (props) {
    const {
      charttitle,
      topperson,
      searchfield,
      widedisplay,
      color,
      context,
      assistant,
      userfilter
    } = props.details;

    const graph = graphfi().using(SPFx(context))

    //STATES
    const [manager,setManager] = useState(null)
    
    //getManager(top)

    const [top_person,setTop_person] = useState(props.top)
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    //DRAGGER
    const dragger = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;; 
    const { events } = useDraggable(dragger, {
      applyRubberBandEffect: false, // activate rubber band effect
    }); 


    //FETCHING INFO
    async function getInfo(topUser) {   
        const userData = await graph.users.getById(`${topUser}`).directReports()
        return await userData
    }
  
    async function getManager(user){    
      setIsLoading(true)
      const newman = await graph.users.getById(user).manager()
      setManager(newman.mail)
      setIsLoading(false)
    }
  
    //ON CHANGES
    const onChangePeople = (e) => {
       //setTop_person(null)  
        e.detail[0] === undefined ? setTop_person(props.top) : setTop_person(e.detail[0].userPrincipalName)
        setManager(null)
        e.detail[0] === undefined ? getManager(props.top) :  getManager(e.detail[0].userPrincipalName)  
    } 
    async function fetchData(man) {
      setIsLoading(true)
      const result = await getInfo(man);
      const clearResult = result.filter((user:any) => user.mail !== null)
      setData(clearResult);
      setIsLoading(false);
    }

    const [topnull,setTopnull] = useState(true)
    const selectManager = async(man) =>{
      setTopnull(false)
      setData([])
      setTop_person(man)
      await getManager(man)
      await fetchData(man)
      setTopnull(true)  
    }

    useEffect(()=>{
      setTop_person(props.top)

      getManager(props.top)

      fetchData(props.top);

    },[props.top])
  
    useEffect(() => {
      getManager(top_person)

      fetchData(top_person);
    },[top_person])

    useEffect(() => {
      getManager(top_person)

      fetchData(top_person);
    },[])


    const assistant_data = data.filter(user => user.jobTitle?.toLowerCase().includes("assistant"))

    const filter_array = userfilter === undefined || userfilter === "" ? [] : userfilter?.replaceAll(" ","").split(";")

    const data_noAssistant = data.filter(user => !user.jobTitle?.toLowerCase().includes("assistant"))

    const filtered_data = filter_array.length < 1 && assistant === false ? data :
                          filter_array.length < 1 && assistant === true ?  data_noAssistant :
                          filter_array.length > 0 && assistant === false ? data.filter(user => {
                            return filter_array?.every(filterStr => !user.userPrincipalName?.toLowerCase().includes(filterStr));
                          }):
                          data_noAssistant.filter(user => {
                            return filter_array?.every(filterStr => !user.userPrincipalName?.toLowerCase().includes(filterStr));
                          })

    const [highlighted,setHighlighted] = useState()
    const highlightHandler = (e) => {
      setHighlighted(e.target.value)
    }

    console.log(filtered_data)

     return (
          <>
          <div className={styles.orgchart_content} style={{backgroundColor:`${color}`}} {...events} ref={dragger}>
            <div className={styles.topWrapper}> 
                <div className={styles.inputs_wrapper}>
                  {
                  searchfield && 
                    <div style={{width:'375px'}}>
                      <PeoplePicker selectionMode="single" selectionChanged={onChangePeople}/>
                    </div>
                  }
                  <input type="text" placeholder="Highlight job position" onChange={highlightHandler}/>
                </div>           
                

                  <div className={styles.top_person_wrapper}>
                    {topnull ? 
                    <TopPersonWrapper 
                      personselected={top_person} 
                      manager={manager} 
                      assistant={assistant_data[0] === null || assistant_data[0] === undefined ? null : assistant_data[0].mail} 
                      onSelectManager={selectManager} />
                      : <Loader/>}
                     {
                      assistant_data[0] === null || assistant_data[0] === undefined || assistant === false ? null :
                      <div className={styles.person_wrapper}>
                        <Person 
                          className={`${styles['person']}`}               
                          personQuery={assistant_data[0].mail}
                          view={ViewType.threelines} 
                          showPresence 
                          personCardInteraction={1}
                        />
                      </div>
                     } 
                  </div>
            </div>
            <div className={styles.orgchar_l1_connector}>x</div>
            <div className={styles.orgchar_l1_wrapper} >
              {isLoading || !topnull ? (
                <Loader/>
              ) : (
                <>
                  {filtered_data.length < 1 ? null : filtered_data.map((user,idx) =>
                      <PersonWrapper 
                      key={idx} 
                      person={user.mail} 
                      context={context}
                      job={user.jobTitle} 
                      highlighted={highlighted}
                      position={idx === 0 ? "first" : idx === data.length-1 ? "last" : "middle"} 
                      onSelectManager={selectManager}
                      filter_array={filter_array}
                      />
                  )}
                </>
              )}
            </div>
            </div>
         </>
    );
  }
