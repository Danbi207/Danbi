import React from 'react';
import styled from 'styled-components';

const PickModal = ({setPickModalOpen}) => {
    const CloseModal = () => {
        setPickModalOpen(false);
    }
    return(
        <PickModalWrap>
            <Wrap>
                <ContentWrap>
                    <Content>
                        대충 뽑은 내용
                    </Content>
                </ContentWrap>
                <Btn>
                    <AcceptBtn onClick={CloseModal}>
                    확인
                    </AcceptBtn>
                </Btn>
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
`

const Wrap = styled.div`
    width: 22rem;
    height: 7.5rem;
    background-color: ${props => props.theme.colors.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 65%;
    border-radius: 5px;
`

const ContentWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
`

const Content = styled.div`
    background-color: gray;
    width: 20rem;
    height: 4.75rem;
    text-align: center;
    border-radius: 5px;
`
const Btn = styled.div`
    width: 20rem;
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