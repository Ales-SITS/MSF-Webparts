import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonCard } from '@microsoft/mgt-react/dist/es6/spfx';
import { ViewType } from '@microsoft/mgt-spfx';
import PersonWrapper_lower from './PersonWrapper'
import { SPFx, graphfi } from "@pnp/graph";

import { Callout } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import "@pnp/graph/users";

import Loader from './Visual/Loader'

export default function PersonWrapper (props) {

    const pos = props.position
    const mail = props.person
    const job = props.job
    const highlighted = props.highlighted
    const filter_array = props.filter_array
    const rule1_type = props.rule1_type
    const rule1 = props.rule1
    const rule1_bg = props.rule1_bg
    const level = props.level + 1
    const maxlevel = props.maxlevel

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
    
  const rule_fn = () => {
    const rule = rule1?.toLowerCase()
    if(rule1_type === "job") {
      return job?.toLowerCase().includes(`${rule}`) 
    } else if (rule1_type === "mail") {
      return mail?.toLowerCase().includes(`${rule}`)
    } else {
      return false
    }
  }

  const rule_style = {
      backgroundColor: `${rule_fn()? rule1_bg : '#ffffff'}`
    }                      


    return (  
        <div className={`
          ${styles.person_wrapper} 
          ${styles[`person_wrapper${level}`]} 
          ${job?.toLowerCase().includes(`${highlighted && highlighted.toLowerCase()}`) && highlighted !== "" && styles.highlighted}
          ${pos==='first' ? styles.person_wrapper_first :
            pos==='last' ?  styles.person_wrapper_last :
            pos==='middle' ? styles.person_wrapper_middle : 
            ""
          }
          `}
          style={rule_style}
        onMouseLeave={()=>setVisibleCard(false)}
        > <span>{`person${level}`}</span>
            <Person   
                onClick={()=>managerHandler(props.person)}
                personQuery={props.person}
                className={styles[`person${level}`]}               
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
              {level > maxlevel ? null :
              <div className={styles.persons_box}>
                  {isLoading ? <Loader/>  : 
                  <>
                          {filtered_data.length < 1 ? null  : filtered_data.map((user,idx) =>                          
                          <PersonWrapper_lower 
                          key={idx} 
                          person={user.mail} 
                          context={props.context} 
                          onSelectManager={managerHandler}
                          position={null} 
                          filter_array={filter_array}
                          job={user.jobTitle} 
                          highlighted={highlighted}
                          rule1_type =  {rule1_type}
                          rule1 = {rule1}
                          rule1_bg = {rule1_bg}
                          level={level}
                          maxlevel={maxlevel}
                          />                   
                          )}
                  </>
                  }
              </div>}

        </div>
       );
  }


  /*
                      key={idx} 
                      person={user.mail} 
                      context={context}
                      job={user.jobTitle} 
                      highlighted={highlighted}
                      position={idx === 0 ? "first" : idx === data.length-1 ? "last" : "middle"} 
                      onSelectManager={selectManager}
                      filter_array={filter_array}
                      rule1_type={rule1_type}
                      rule1={rule1}
                      rule1_bg={rule1_bg}
  
  */