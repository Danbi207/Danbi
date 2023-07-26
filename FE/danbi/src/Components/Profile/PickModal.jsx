import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import PickAnimation from './data.json';

const PickModal = ({setPickModalOpen}) => {
    const [ShowAnimation, setShowAnimation] = useState(true);    

    useEffect(() => {
        const timeout = setTimeout(() => {
          setShowAnimation(false);
        }, 1500);
    
        return () => clearTimeout(timeout);
      }, []);

    const CloseModal = () => {
        setPickModalOpen(false);
    }
    return(
        <PickModalWrap>
            <Wrap>
                {ShowAnimation ? (
                        <Lottie animationData={PickAnimation} />
                ) : (
                <ContentWrap>
                    <Content>
                        대충 뽑은 내용
                    </Content>
                    <Btn>
                        <AcceptBtn onClick={CloseModal}>
                            확인
                        </AcceptBtn>
                    </Btn>
                </ContentWrap>
                )}
            </Wrap>
        </PickModalWrap>
    )
}

const PickModalWrap = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrap = styled.div`
    width: 90%;
    height: 7.5rem;
    background-color: ${props => props.theme.colors.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`

const ContentWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center; 
    flex-direction: column;
`

const Content = styled.div`
    background-color: gray;
    width: 85%;
    height: 4.75rem;
    text-align: center;
    border-radius: 5px;
`
const Btn = styled.div`
    width: 85%;
    display: flex;
    justify-content: end;
`

const AcceptBtn = styled.button`
    width: 3.5rem;
    height: 1rem;
    border-radius: 10px;
    background-color: #6161ff;
    margin-top: 0.25rem;
`

export default PickModal