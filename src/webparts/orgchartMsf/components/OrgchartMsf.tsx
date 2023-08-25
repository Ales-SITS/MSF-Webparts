import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useDraggable } from "react-use-draggable-scroll";
import styles from './OrgchartMsf.module.scss';
import {  PeoplePicker } from '@microsoft/mgt-react';
import TopPersonWrapper from './TopPersonWrapper';
import { SPFx, graphfi } from "@pnp/graph";
import "@pnp/graph/users";
import PersonWrapper from './PersonWrapper'


export default function OrgchartMsf (props) {
    const {
      charttitle,
      topperson,
      searchfield,
      widedisplay,
      color,
      context
    } = props.details;
    
   
    //STATES
    const [manager,setManager] = useState(null)
    getManager(topperson[0].email)

    const [top_person,setTop_person] = useState(topperson[0].email)
    const [title,setTitle] = useState(charttitle)
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);


    //VISUAL
    const [wide,setWide] = useState(widedisplay)
    const wideHandler = () => {
        setWide(!wide)
    }

    //DRAGGER
    const dragger = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;; 
    const { events } = useDraggable(dragger, {
      applyRubberBandEffect: false, // activate rubber band effect
    }); 


    //FETCHING INFO
    async function getInfo() {
        const graph = graphfi().using(SPFx(context))
        const userData = await graph.users.getById(`${top_person}`).directReports()
        return await userData
    }
  
    async function getManager(user){    

      setIsLoading(true)  
      const graph = graphfi().using(SPFx(context))
      const newman = await graph.users.getById(user).manager()
      setManager(newman.mail)
      
      setIsLoading(false)
    }

  
    //ON CHANGES
    const onChangePeople = (e) => {
    
      //setTop_person(null)  
        e.detail[0] === undefined ? setTop_person(topperson[0].email) : setTop_person(e.detail[0].userPrincipalName)
        setManager(null)
        e.detail[0] === undefined ? getManager(topperson[0].email) :  getManager(e.detail[0].userPrincipalName)  
        
        e.detail[0] === undefined ? setTitle(charttitle) : titleCreator(e.detail[0].userPrincipalName)  
    }
   

    const titleCreator = (manager) => {
        console.log(manager)
        console.log(topperson[0].email)
        manager === topperson[0].email ? setTitle(charttitle) : setTitle(`MSF organization chart`)
    }

    const selectManager = (man) =>{
      setData([])
      setManager(null)
      setTop_person(man)
      getManager(man)
      titleCreator(man)
    }


    useEffect(()=>{
      setTop_person(topperson[0].email)
      getManager(topperson[0].email)
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

     return (
        <div style={{backgroundColor:`${color}`}} className={wide ? styles.orgchart_wide : styles.orgchart_standard} {...events} ref={dragger} >
          <button className={styles.wideButton} onClick={wideHandler}>{wide ? "> <" : "< >"}</button>
          <div className={styles.orgchartHeader}><h1>{title}</h1></div> 
          <div className={styles.topWrapper}>
                
            {topperson === undefined ? null : 
            <>
              {searchfield && <div style={{width:'375px'}}><PeoplePicker selectionMode="single" selectionChanged={onChangePeople}/></div>}
              {top_person === null || isLoading === true ? null :
               <TopPersonWrapper personselected={top_person}  manager={manager} onSelectManager={selectManager} />
               }
            </>}
          </div>
          <div className={styles.orgchar_l1_connector}>x</div>
          <div className={styles.orgchar_l1_wrapper} >
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {data.length < 1 ? null : data.map((user,idx) =>
                      <PersonWrapper key={idx} person={user.mail} context={context} position={idx === 0 ? "first" : idx === data.length-1 ? "last" : "middle"} onSelectManager={selectManager}/>
                )}
               </>
            )}
          </div>
         </div>
    );
  }
