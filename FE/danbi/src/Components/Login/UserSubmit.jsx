import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { useSelector } from 'react-redux';


import UserType from './UserType';
import UserFile from './UserFile';


const UserSubmit = () => {
  let [sex, setSex] = useState('');
  let [usertype, setUserType] = useState('');
  let [fileList, setFileList] = useState([]);
  let [mode, setMode] = useState(true);
  
  //DO : 토큰 테스트용 코드
  const tokeninfo = useSelector((state)=>state.user.tokenInfo);
  useEffect(()=>{
    console.log(tokeninfo);
  },[])
 
  const submit = () => {
  }

  return (
    <SubmitWrap>
    {
      mode ? <UserType mode={mode} sex={sex} usertype={usertype} setMode={setMode} setSex={setSex} setUserType={setUserType} /> : 
      <UserFile fileList={fileList} sex={sex} usertype={usertype} setFileList={setFileList} submit={submit} />
    }
  </SubmitWrap>
  )
}

const SubmitWrap = styled.div`
  width: 100%;
  height: 100%;
` 

export default UserSubmit; 