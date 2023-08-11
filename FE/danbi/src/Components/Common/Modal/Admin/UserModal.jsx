import React from 'react'
import { styled } from 'styled-components'

const UserModal = () => {
  return (
    <Wrap>UserModal</Wrap>
  )
}

const Wrap = styled.div`
  position: fixed;
  z-index: 6;
  left: 25%;
  width: 50%;
  height: 80%;
  top: 10%;
  @media screen and (max-width: 500px) {
    width: 80%;
    left: 10%;
    height: 75%;
    top: 12.5%;
  }
  padding: 1rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color:${props=>props.theme.colors.titleColor};
`

export default UserModal