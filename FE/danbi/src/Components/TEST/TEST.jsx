import axios from 'axios';
import React,{ useState } from 'react'
import styled from 'styled-components';
const TEST = () => {
  const [url,setUrl] = useState("");
  return (
    <div>
      <input onChange={(e)=>setUrl(e.target.value)}></input>
      <Btn onClick={()=>{
        console.log(url);
        axios({
          method:"get",
          url:url
        }).then(({data})=>{
          console.log(data);
        }).catch(err=>console.log(err));
      }}>TEST</Btn>
    </div>
  )
}
const Btn=styled.button`
  margin-left: 1rem;
  background-color: red;
`
export default TEST