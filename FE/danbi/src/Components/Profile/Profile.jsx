import React from 'react';
import styled from 'styled-components';
import Header  from '../Common/Header/Header.jsx';
import Footer from '../Common/Footer/Footer.jsx';
import UserInfo from './UserInfo.jsx';
import PresetButton from './PresetButton.jsx';
import Jandi from './Jandi.jsx';
import GuestBook from './GuestBook.jsx';

const Profile = () => {
    return(
        <ProfileWrap>
            <Header />
            <Wrap>
                <UserInfo />
                <PresetButton />
                <Jandi />
                <GuestBook/>
            </Wrap>
            <Footer />
        </ProfileWrap>
    )
}

const ProfileWrap = styled.div`
    width: 100%;
    background-color: ${props=>props.theme.colors.bgColor};
    color: ${props=>props.theme.colors.titleColor};
    display: flex;
    flex-direction: column;
`

const Wrap = styled.div`
`

export default Profile