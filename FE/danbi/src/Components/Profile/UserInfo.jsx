import React from 'react'
import styled from 'styled-components';
import example from './example-profile.jpg';

const UserInfo = () => {
    return (
        <UserInfoWrap>
            <ProfileImage src={example} alt='img' />
                <UserDetail>
                    <UserName>김민규</UserName>
                    <PlusButton>친구추가</PlusButton>
                </UserDetail>
        </UserInfoWrap>
    )
}

const UserInfoWrap = styled.div`
    width: 100%;
    height: 6.25rem;
    display: flex;
    padding: 0 2.5rem;
`

const ProfileImage = styled.img`
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
`

const UserDetail = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const UserName = styled.div`
    font-size: 17px;
    height: 1rem;
    text-align: center;
`

const PlusButton = styled.button`
    background-color: #6161FF;
    color: white;
    border-radius: 10px;
    width: 8rem;
    height: 2rem;
`


export default UserInfo