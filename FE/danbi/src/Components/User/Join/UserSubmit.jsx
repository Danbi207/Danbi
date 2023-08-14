import React, { useState } from 'react'
import styled from 'styled-components'
import UserType from './UserType';
import UserFile from './UserFile';

const UserSubmit = () => {
  const [usertype, setUserType] = useState(localStorage.getItem('role'));

  return (
    <SubmitWrap>
      {/* <UserType usertype={usertype} setUserType={setUserType}/> */}
      <UserFile usertype={usertype} setUserType={setUserType}/>
    {/* {
      usertype === 'ROLE_UNDEFINED' ? 
      <UserType usertype={usertype} setUserType={setUserType}/> : 
      <UserFile usertype={usertype} setUserType={setUserType}/>
    } */}
  </SubmitWrap>
  )
}

const SubmitWrap = styled.div`
  width: 100%;
  height: 100%;
` 

export default UserSubmit; 