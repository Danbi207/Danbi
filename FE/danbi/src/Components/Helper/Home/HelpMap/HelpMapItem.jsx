import React from 'react'
import styled from 'styled-components';
const HelpMapItem = (props) => {
  return (
    <>
      {
        props.help?
          <HelpMapItemWrap>{props.help.content}</HelpMapItemWrap>
          :<HelpMapItemWrap/>
      }
    </>
  )
}
const HelpMapItemWrap = styled.div`
  width: 100%;
  height: 25rem;
  position: absolute;
  bottom: 0;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  z-index: 2;
`
export default HelpMapItem