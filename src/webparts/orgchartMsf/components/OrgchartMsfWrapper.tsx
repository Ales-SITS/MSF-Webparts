import * as React from 'react';
import {useState, useEffect, Suspense} from 'react';
import styles from './OrgchartMsf.module.scss';
import OrgchartMsf from './OrgchartMsf';

import { SPFx, graphfi } from "@pnp/graph";
import "@pnp/graph/users";

import Loader from './Visual/Loader'

//const OrgchartMsf = React.lazy(() => import('./OrgchartMsf'));

function urlReader() {
      let top_person_query
      if (window.location.search?.split('=')[1]?.includes("&")) {
        top_person_query = window.location.search?.split('=')[1].split('&')[0]?.replace("%40","@")
      } else {
        top_person_query = window.location.search?.split('=')[1]?.replace("%40","@")
      }
    
      return top_person_query
    }


export default function OrgchartMsfWrapper (props){
    const graph = graphfi().using(SPFx(props.context))
    const title = props.charttitle
    const widedisplay = props.widedisplay
    const [top,setTop] = useState(null)

    //INITIAL LOAD of TOP PERSON
    useEffect(()=>{
      const userFromUrl = urlReader()
      topHandler(userFromUrl)      
    },[])

    useEffect(()=>{
      const userFromUrl = urlReader()
      topHandler(userFromUrl)
    },[props.topperson, window.location.search])


    async function topHandler(userFromUrl) {
      const url_user = userFromUrl
      if (url_user !== null && url_user !== undefined) {
        setTop(userFromUrl)
      } else {
        const prop_user = props.topperson
        if (prop_user === undefined || prop_user.length === 0) {
          const current_user = await graph.me();
          setTop(current_user.mail)
        } else {
          setTop(prop_user[0].email)
        } 
      }
    }

    //VISUAL
    const [wide,setWide] = useState(widedisplay)
    const wideHandler = () => {
        setWide(!wide)
    }

    console.log(top)
    return (

      <div className={wide ? styles.orgchart_wide : styles.orgchart_standard}>
          <button  type="button" className={styles.wideButton} onClick={wideHandler}>{wide ? "> <" : "< >"}</button>
          <h1 className={styles.orgchartHeader} style={{backgroundColor:`${props.color}`}}>{title}</h1>
          {top === null ? <Loader/> : <OrgchartMsf details={props} top={top}/>}
      </div>
    );
  }


//?topperson=johnryan.brooks%40newyork.msf.org