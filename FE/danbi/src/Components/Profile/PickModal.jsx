import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Lottie from 'lottie-react';
import PickAnimation from './data.json';
import { useSelector } from 'react-redux';


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

    const cur_dew = useSelector((state) => state.Jandi.dew_point);
    const cur_UncheckedColor = useSelector((state) => state.Jandi.item.uncheckedRgb);
    const cur_CheckedColor = useSelector((state) => state.Jandi.item.checkedRgb);
    const cur_Name = useSelector((state) => state.Jandi.item.name);
    const cur_Tier = useSelector((state) => state.Jandi.item.tier);

    return(
        <PickModalWrap>
            {ShowAnimation ? (
                <AnimationWrap>
                    <Lottie animationData={PickAnimation} style={{ width: '100%', height: '100%'}} />
                </AnimationWrap>
            ) : (
                <Wrap>
                    <ContentWrap>
                        <Content>{cur_CheckedColor}{cur_Name}{cur_UncheckedColor}{cur_dew}{cur_Tier}</Content>
                        <Btn>
                        <AcceptBtn onClick={CloseModal}>확인</AcceptBtn>
                        </Btn>
                    </ContentWrap>
                </Wrap>
            )}
        </PickModalWrap>
    )
}

const fadeIn = keyframes`
    from {
        transform: scaleX(0);
        opacity: 0;
    }
    to {
        transform: scaleY(1);
        opacity: 1;
    }
`


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
    animation: ${fadeIn} 0.25s linear;
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

const AnimationWrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.bgColor};
`

export default PickModal