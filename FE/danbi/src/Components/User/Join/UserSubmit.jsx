import React from 'react'
import styled from 'styled-components'
import UserType from './UserType';
import UserFile from './UserFile';
import { useState } from 'react';

const UserSubmit = () => {
  const role = localStorage.getItem('role')
  const [usertype, setUserType] = useState(role);
 
  return (
    <SubmitWrap>
    {
      role === 'ROLE_UNDEFINED' ? 
      <UserType role={role} usertype={usertype} setUserType={setUserType}/> : 
      <UserFile role={role} usertype={usertype} setUserType={setUserType}/>
    }
  </SubmitWrap>
  )
}

const SubmitWrap = styled.div`
  width: 100%;
  height: 100%;
` 

export default UserSubmit; 