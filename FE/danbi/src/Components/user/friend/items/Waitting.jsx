import React from 'react';
import styled from 'styled-components';
import example from '../example-profile.jpg';

const Waitting = ({value}) => {
    return(
        <WaittingWrap>
            <InfoWrap>
                <ImgWrap src={example} />
                <Name>{value.name}</Name>
            </InfoWrap>
            <Btns>
                <AcceptBtn>
                    수락
                </AcceptBtn>
                <DeleteBtn>
                    삭제
                </DeleteBtn>
            </Btns>
        </WaittingWrap>
    );
}

const WaittingWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem;
    margin: 1rem 0;
    width: 100%;
    height: auto; 
`
const ImgWrap = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
`
const Name = styled.span`
    font-size: 32px;
    padding-left: 0.5rem;
`
const InfoWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Btns = styled.div`
    font-size: 16px;
    width: 8.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const AcceptBtn = styled.button`
    border-radius: 10px;
    background-color: #6161FF;
    color: white;
    width: 4rem;
    height: 2rem;
`
const DeleteBtn = styled.button`
    border-radius: 10px;
    background-color: #D9D9D9;
    color: black;
    width: 4rem;
    height: 2rem;
`

export default Waitting