import React from 'react';
import styled from 'styled-components';
import example from '../example-profile.jpg';

const MyFriend = ({value}) => {
    return(
        <MyFriendWrap>
            <InfoWrap>
                <ImgWrap src={example} />
                <Name>{value.name}</Name>
            </InfoWrap>
            <Btn>
                <DeleteBtn>
                    삭제
                </DeleteBtn>
            </Btn>
        </MyFriendWrap>
    );
}

const MyFriendWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem;
    margin: 1rem 0;
    width: 100%;
    height: auto;
`

const InfoWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const Btn = styled.div`
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const DeleteBtn = styled.button`
    border-radius: 10px;
    background-color: #D9D9D9;
    color: black;
    width: 4rem;
    height: 2rem;
`

export default MyFriend