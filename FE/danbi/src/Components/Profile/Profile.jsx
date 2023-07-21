import React from 'react';
import styled from 'styled-components';

const Profile = () => {
    return(
        <ProfileWrap>Profile</ProfileWrap>
    )
}

const ProfileWrap = styled.div`
    background-color: ${props=>props.theme.colors.bgColor};
    color: ${props=>props.theme.colors.titleColor};
`

export default Profile