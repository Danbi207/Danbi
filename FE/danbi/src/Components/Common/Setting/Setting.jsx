import React from 'react'
import styled from 'styled-components';
const Setting = () => {
  return (
    <SettingWrap>
        <SettingBtn>Light Mode</SettingBtn>
        <SettingBtn>Dark Mode</SettingBtn>
    </SettingWrap>
  )
}

const SettingBtn = styled.button`
    background-color: aqua;
    width: 100%;
    height: 3rem;
`
const SettingWrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
`
export default Setting