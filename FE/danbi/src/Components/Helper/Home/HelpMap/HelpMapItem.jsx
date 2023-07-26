import React from 'react'
import styled,{keyframes} from 'styled-components';
const HelpMapItem = (props) => {
  return (
    <>
      {
        props.help?
          <HelpMapItemWrap detailMode={props.detailMode} >{props.help.content}</HelpMapItemWrap>
          :<HelpMapItemWrap/>
      }
    </>
  )
}

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translate(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: scaleY(1);
    opacity: 0;
  }

  to {
    transform: scaleY(0);
    opacity: 1;
  }
`;

const HelpMapItemWrap = styled.div`
  width: 100%;
  height: 25rem;
  position: absolute;
  bottom: 0;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  z-index: 2;
  border: 1px solid #b1b1b1;
  border-radius: 1rem 1rem 0 0 ;
  padding: 1rem;

  visibility: ${props => props.detailMode ? 'visible' : 'hidden'};
  animation: ${props => props.detailMode ? slideIn : slideOut} 0.5s linear;
  transition: visibility 0.5s linear;
`
export default HelpMapItem