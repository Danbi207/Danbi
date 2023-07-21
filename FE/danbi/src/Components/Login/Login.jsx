import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../../store/Slice/userSlice.js";
import styled from 'styled-components';
const Login = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  return (
    <LoginWrap>
      <TESTBTN onClick={()=>{dispatch(setAccessToken("TEST"));}}>테스트</TESTBTN>
      <div>토큰 : {accessToken}</div>
    </LoginWrap>
  )
}
const TESTBTN = styled.button`
  width: 5rem;
  height: 3rem;
  background-color: blue;
`
const LoginWrap = styled.div`
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
`
export default Login