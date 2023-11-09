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
import { BasicGroupName } from 'ButtoncssMsfWebPartStrings';

export default function PersonWrapper (props) {

    const pos = props.position
    const mail = props.person
    const job = props.job
    const filter_array = props.filter_array
    const level = props.level + 1
    const highlighted = props.highlighted

    const {
      context,
      maxlevel,
      rules
    } = props.details

    const [isLoading, setIsLoading] = useState(true);
    const [visibleCard, setVisibleCard] = useState(false)  
    const [data, setData] = useState([]);
  
    async function getInfo() {
        const graph = graphfi().using(SPFx(context))
        const userData = await graph.users.getById(`${mail}`).directReports()
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
    
  const rule_fn = (fn_type) => {
    let bg = 'rgba(255,255,255,1)'
    let border ='rgba(255,255,255,0)'

    rules?.reverse().forEach( rule => {
      if (rule.rule_type === "job" && job?.toLowerCase().includes(`${rule.rule_text.toLowerCase()}`)) {
        bg = rule.rule_bg === null ? bg : rule.rule_bg
        border = rule.rule_border === null ? border : rule.rule_border
      } else if (rule.rule_type === "mail" && mail?.toLowerCase().includes(`${rule.rule_text}`)) {
        bg = rule.rule_bg === null ? BasicGroupName : rule.rule_bg
        border = rule.rule_border === null ? border : rule.rule_border
      } else {
        return 
      } 
    });

    if (fn_type === 1) 
    {
      return bg
    }
    else 
    {
      return border
    }

  }

  const rule_style = {
      backgroundColor: `${rule_fn(1)}`,
      border: `1px solid ${rule_fn(2)}`
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
        >
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
              {level >= maxlevel ? null :
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
                          details={props.details}
                          highlighted = {highlighted}
                          level={level}
                          />                   
                          )}
                  </>
                  }
              </div>}

        </div>
       );
  }
