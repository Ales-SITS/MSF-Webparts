import * as React from 'react';
import styles from './RedirectMsf.module.scss';
import { useState,useEffect} from 'react';


export default function ButtonMsf (props): React.ReactElement {

const {
  redirect_default_url,

  redirect_message_l,
  redirect_message_link,
  redirect_message_r,
  redirect_url,
  redirect_counter,

  redirect_BG,
  redirect_BR,
  redirect_size,
  redirect_FC,

  redirect_counter_display,
  redirect_counter_size,
  redirect_counter_FC,

  redirect_stop_display,
  redirect_stop_text,
  redirect_stop_size,
  redirect_stop_BG,
  redirect_stop_BR,
  redirect_stop_FC
} = props.details

const [stop, setStop] = useState(false)
const stopHandler = () => {
  setStop(!stop)
  clearTimeout(t)
}

let t

const [counter, setCounter] = useState(redirect_counter);

function test () {
  t = setTimeout(() => setCounter(counter - 1), 1000) 
}

useEffect(()=>{
  setCounter(redirect_counter) 
},[redirect_counter])



useEffect(() => {
  stop === true ? 
  null : 
  document.location.href.indexOf('Mode=Edit') !== -1 || document.location.href.indexOf('workbench.aspx') !== -1 ?
  null : 
  counter > 0 && test() 

  redirect_url !== undefined && redirect_url !== '' && stop === false && counter === 0 && document.location.href.indexOf('Mode=Edit') === -1 && document.location.href.indexOf('workbench.aspx') === -1 ?
  window.location.href = `${redirect_url}` : 
  null 
}, [counter, stop]);
    
const inlineStyle = {

  wrapper: {
   backgroundColor: `${redirect_BG}`,
   borderRadius: `${redirect_BR}px`,
   fontSize: `${redirect_size}px`,
   color: `${redirect_FC}`
  },
  counter: {
    fontSize: `${redirect_counter_size}px`,
    color: `${redirect_counter_FC}`
  },
   button: {
    backgroundColor: `${redirect_stop_BG}`,
    borderRadius: `${ redirect_stop_BR}px`,
    fontSize: `${redirect_stop_size}px`,
    color: `${redirect_stop_FC}`
  }
}

    return (
      <section className={styles.redirect_section}>
        <div className={styles.redirect_wrapper} style={inlineStyle.wrapper}>
            <span>{redirect_message_l} <a href={`${redirect_url}`} target="_self" rel = "" data-interception="off">{redirect_message_link}</a> {redirect_message_r}</span>
            {redirect_counter_display ?
             <span style={inlineStyle.counter}>{counter}</span>
            : null }
            {redirect_stop_display ? 
            <button className={styles.redirect_button} style={inlineStyle.button} onClick={stopHandler}>{redirect_stop_text}</button> 
            : null}
        </div>
      </section>
    );
}