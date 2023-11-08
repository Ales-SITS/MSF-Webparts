import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './OrgchartMsf.module.scss';

import { SPFx, graphfi } from "@pnp/graph";
import "@pnp/graph/users";

import { Search16Regular } from "@fluentui/react-icons";

//import kitty from '../assets/kitty.gif'

//Components
import Loader from './Visual/Loader'
import {
  Input,
  makeStyles,
  shorthands,

} from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import { PeoplePicker } from '@microsoft/mgt-react';
import OrgchartMsf from './OrgchartMsf';

const kitty = require('../assets/kitty.gif')

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
    const searchfield = props.searchfield

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

    const onChangePeople = (e) => {
      //setTop_person(null) 
      console.log(e) 
       e.detail[0] === undefined ?
       topHandler(urlReader()) :
       setTop(e.detail[0].userPrincipalName)
       //setTop(null)
       //e.detail[0] === undefined ? getManager(props.top) :  getManager(e.detail[0].userPrincipalName)  
   } 

    //VISUAL
    const [wide,setWide] = useState(widedisplay)
    const wideHandler = () => {
        setWide(!wide)
    }

    const [highlighted,setHighlighted] = useState()
    const highlightHandler = (e) => {
      setHighlighted(e.target.value)
    }

    return (

      <div className={wide ? styles.orgchart_wide : styles.orgchart_standard}>
          <button  type="button" className={styles.wideButton} onClick={wideHandler}>{wide ? "> <" : "< >"}</button>
          <h1 className={styles.orgchartHeader} style={{backgroundColor:`${props.color}`}}>{title}</h1>
          <div className={styles.inputs_wrapper} style={{backgroundColor:`${props.color}`}}>
                  {searchfield &&
                    <div style={{width:"380px"}}>   
                      <PeoplePicker 
                        selectionMode="single" 
                        selectionChanged={onChangePeople}
                        style={{width:"380px"}}
                        />
                    </div>
                  }
                  <FluentProvider theme={webLightTheme} >
                    <div >
                      <Input 
                      contentBefore={<Search16Regular/>} 
                      onChange={highlightHandler} 
                      type="text" 
                      placeholder="Highlight job position"
                      style={{width:"380px"}}
                      />
                    </div>
                  </FluentProvider>
          </div>  
          {top === null ? 
           <Loader/> :
           <OrgchartMsf 
           details={props}
           top={top}
           highlighted={highlighted}
           />}
           { highlighted === "sitsisdabest" ? <img className={styles.hidden_kitty} src={kitty}/> : null}
      </div>
    );
  }


//?topperson=johnryan.brooks%40newyork.msf.org