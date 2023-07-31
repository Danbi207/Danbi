import React from 'react';
import styled from 'styled-components';
import Waitting from './items/Waitting';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import MyFriend from './items/MyFriend';

const myFriends = [
    {
        profile_url : './example-profile.jpg',
        name: '김민규',
        dew_point: 123,
    },
    {
        profile_url : './example-profile.jpg',
        name: '김민규',
        dew_point: 123,
    }
]

const waittingFriends = [
    {
        profile_url : './example-profile.jpg',
        name: '김민규',
        dew_point: 123,
    },
    {
        profile_url : './example-profile.jpg',
        name: '김민규',
        dew_point: 123,
    }
]

const Friend = () => {
    return(
        <FriendWrap>
            <Header />
            <WaitingWrap>
                <WaittingHeader>수락 대기 중</WaittingHeader>
                {waittingFriends.map((value, index) => (
                    <Waitting value={value} key={index} />
                ))}
            </WaitingWrap>
            <ListWrap>
                <ListHeader>친구 목록</ListHeader>
                {myFriends.map((value, index) => (
                    <MyFriend value={value} key={index} />
                ))}
            </ListWrap>
            <Footer />
        </FriendWrap>
    );
}

const FriendWrap = styled.div`
    font-size: 16px;
`
const WaitingWrap = styled.div`
    margin: 1rem 0 2rem 0;
`
const ListWrap = styled.div`
    margin: 1rem 0 2rem 0;
    
`

const WaittingHeader = styled.span`
    margin-left: 1.5rem;
`
const ListHeader = styled.span`
    margin-left: 1.5rem;
`

export default Friend