import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { styled } from 'styled-components'
import {setMode} from "../../../../store/Slice/ModalSlice"
const UserModal = () => {
  const user = useSelector(state=>state.admin.user);
  const dispatch = useDispatch();
  return (
    <Wrap>
      <button onClick={()=>{dispatch(setMode(null))}}>X</button>
      <div>{user.name}</div>
      <img alt='' src={user.profileUrl}></img>
    </Wrap>
  )
}

const Wrap = styled.div`
  position: fixed;
  z-index: 6;
  width: 80%;
  left: 10%;
  height: 75%;
  top: 12.5%;
  
  padding: 1rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color:${props=>props.theme.colors.titleColor};
`

export default UserModal