import React from 'react';
import styled from 'styled-components';
import Header from '../Common/Header/Header';
const Profile = () => {
    return(
        <ProfileWrap><Header></Header>Profile</ProfileWrap>
    )
}

const ProfileWrap = styled.div`
    background-color: ${props=>props.theme.colors.bgColor};
    color: ${props=>props.theme.colors.titleColor};
`

export default Profile