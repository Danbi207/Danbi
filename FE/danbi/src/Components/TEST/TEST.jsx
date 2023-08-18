import axios from 'axios';
import React,{ useState,useCallback } from 'react'
import styled from 'styled-components';
import { authDelete, authFilePost, authGet, authPost, authPut } from '../../Util/apis/api';
const TEST = () => {
  const [url,setUrl] = useState("");
  const [method,setMethod] = useState("get");
  const [request,setRequest] = useState("");
  const [file,setFile] = useState(null);
  const [fileKey,setFileKey] = useState("");
  const noTokenApi = useCallback(()=>{
    if(method === "get"){
      axios({
        method,
        url,
      }).then(({data})=>console.log(data)).catch(err=>console.log(err.response));
    }else{
      axios({
        method,
        url,
        data:JSON.parse(request)
      }).then(({data})=>console.log(data)).catch(err=>console.log(err.response));
    }
  },[method,url,request]);

  const tokenApi = useCallback(async ()=>{
    try{
      if(method==="get"){
        const res = await authGet(url);
        if(res === null) alert("로그인이 안되어있습니다")
        console.log(res);
      }
  
      if(method==="post"){
        const res = await authPost(url,JSON.parse(request));
        if(res === null) alert("로그인이 안되어있습니다")
        console.log(res);
      }
  
      if(method==="put"){
        const res = await authPut(url,JSON.parse(request));
        if(res === null) alert("로그인이 안되어있습니다")
        console.log(res);
      }
  
      if(method==="delete"){
        const res = await authDelete(url,JSON.parse(request));
        if(res === null) alert("로그인이 안되어있습니다")
        console.log(res);
      }
    }catch(err){
      console.log(err);
    }
  },[method,url,request]);

  const fileApi = useCallback(async ()=>{
    try{
      if(!file){
        alert("파일을 입력해주세요");
        return;
      }
      if(!fileKey||fileKey===""){
        alert("파일 key를 입력해주세요");
        return;
      }
      const json = request&&request!=="" ? JSON.parse(request) : {};
      json[fileKey] = file;
      console.log(json);
      const formData = new FormData();
      for (let key in json ) {
        formData.append(key, json[key]);
      }
      const res = await authFilePost(url,formData);
      if(res === null) alert("로그인이 안되어있습니다")
      console.log(res);
    }catch(err){
      console.log(err);
    }
  },[file,request,fileKey,url]);

  return (
    <Wrap>
      <span>url</span>
      <Input onChange={e=>setUrl(e.target.value)}/>
      <span>method </span>
      <select onChange={e=>setMethod(e.target.value)}>
        <option value="get">GET</option>
        <option value="post">POST</option>
        <option value="put">PUT</option>
        <option value="delete">DELETE</option>
      </select>
      <span>request Body</span>
      <Textarea onChange={e=>setRequest(e.target.value)}></Textarea>
      <span>file Key값</span>
      <Input onChange={e=>setFileKey(e.target.value)}></Input>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/>
      <BtnWrap>
        <Btn onClick={noTokenApi}>토큰 없는 요청</Btn>
        <Btn onClick={tokenApi}>토큰 필요한 요청</Btn>
        <Btn onClick={fileApi}>파일 요청</Btn>
      </BtnWrap>
    </Wrap>
  )
}
const Wrap = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  color: ${props=>props.theme.colors.titleColor};
  background-color: ${props=>props.theme.colors.bgColor};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Textarea = styled.textarea`
  width: 100%;
  height: 50%;
  resize: none;
`

const Input = styled.input`
  width: 100%;
`

const Btn=styled.button`
  padding: 0.25rem 1rem;
  background-color: #FFEA7E;
  color: #000;
  border-radius: 0.5rem;
`
const BtnWrap = styled.div`
  display: flex;
  gap: 1rem;
`
export default TEST