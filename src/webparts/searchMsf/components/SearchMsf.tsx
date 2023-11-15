import * as React from 'react';
import { useState,useEffect } from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';

export default function SearchMsf (props): React.ReactElement  {
    const {
      solution_urls,
      solution_blank,
      input_placeholder,
      dropdown_display,
      button_display,
      button_label,
      button_icontoggle,
      button_icon,
      context
    } = props.details;

    const webpartID = context.instanceId.replaceAll("-","")

    const[searchWord,setSearchWord] = useState("")
    const setSearchWordHandler = (e) => {
     setSearchWord(e.target.value)
    }
 
    const emptyURL = {drop_icon: '',uniqueId: '', drop_url: '',drop_label: '', drop_suffix: '', sortIdx: 0}

    const [selectedUrl, setSelectedUrl] = useState(solution_urls === undefined? emptyURL : solution_urls[0]); 
    const selectedUrlHandler = (id) => {
      console.log("triggered")
      const selectedUniqueId = id
      const selectedSolution = solution_urls.find(solution => solution.uniqueId === selectedUniqueId);
      setSelectedUrl(selectedSolution);
      setDrop(!drop)
    }
   
    const navigation = (e) => {
       e === "Enter" || e.key ==="Enter" ? 
       window.open(`${selectedUrl.drop_url}${searchWord}${selectedUrl.drop_suffix}`, solution_blank ? "_blank" : "_self") : null
    }
  

    useEffect (()=>{
      setSelectedUrl(solution_urls === undefined? emptyURL : solution_urls[0])
    },[solution_urls])

    const [drop,setDrop] = useState(false)

    console.log(solution_urls)

    return (
      <div 
        className={`searchmsf_${webpartID}_wrapper`}
        onKeyDown={(e)=>{navigation(e)}} 
      >
        <input 
          className={`searchmsf_${webpartID}_input`}
          type="text"
          onChange={setSearchWordHandler}
          value={searchWord}
          placeholder={input_placeholder}
        />
        {dropdown_display&&
        <div className={`searchmsf_${webpartID}_dropdown`}>
          <div 
            className={`searchmsf_${webpartID}_dropdown_header`}
            onClick={()=>{setDrop(!drop)}}>
              <FontIcon 
                aria-label={selectedUrl.drop_icon} 
                iconName={selectedUrl.drop_icon} 
                className={`searchmsf_${webpartID}_dropdown_header_icon`}
              />
            {selectedUrl.drop_label}
          </div>
          {drop&&
          <div className={`searchmsf_${webpartID}_dropdown_optionblock`}>
            <ul>
            {solution_urls?.map((solution) => (
                  <li>
                      <button
                      className={`searchmsf_${webpartID}_dropdown_option`}
                      key={solution.uniqueId} 
                      onClick={()=>selectedUrlHandler(solution.uniqueId)} 
                      >
                      <FontIcon 
                          aria-label={solution.drop_icon} 
                          iconName={solution.drop_icon} 
                          className={`searchmsf_${webpartID}_dropdown_option_icon`}
                      />
                      {solution.drop_label}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          }
        </div>
        }
        {button_display &&
        <button 
         className={`searchmsf_${webpartID}_button`} 
         onClick={()=>{navigation("Enter")}}>
          {button_icontoggle === false ? null : 
          <FontIcon 
          aria-label={button_icon} 
          iconName={button_icon} 
          className={`searchmsf_${webpartID}_icon`}
          />}
          {button_label}
        </button>
        }
      </div>
    );
  }
