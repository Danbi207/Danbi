import React from 'react';
import styled from 'styled-components';
import friendbadge from '../friendbadge.svg';
import redcard from '../red-flag.svg';
import yellowcard from '../yellow-flag.svg';
import more from '../More-black.svg';

const UserInfo = ({data}) => {
    console.log(data.ip);
    return(
        <UserInfoWrap>
            <ProfileImg src={data.ip.profile_url} />
            <Body>
                <BottomWrap>
                    <Name>{data.ip.name}</Name>
                    {data.friendFlag ? <FriendBadge src={friendbadge} /> : null}
                    {data.ip.accuse_point < 0 ? null : data.ip.accuse_point > 1 ? <AccuseBadge src={yellowcard} /> : <AccuseBadge src={redcard} />}
                </BottomWrap>
                <DewPoint>{data.ip.accumulateDewPoint}</DewPoint>
            </Body>
            <More>
                <MoreImg src={more} />
            </More>
        </UserInfoWrap>
    );
}

const UserInfoWrap = styled.div`
    display: flex;
    height: 4rem;
    width: 100%;
`
const ProfileImg = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-left: 1.5rem;
`
const Name = styled.span`
    font-size: 20px;
`

const BottomWrap = styled.div`
    display: flex;
    flex-direction: row;
`

const DewPoint = styled.div`
    font-size: 20px;
    color: white;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
`
const FriendBadge = styled.img`
    width: 1rem;
    height: 1rem;
`

const AccuseBadge = styled.img`
    width: 1rem;
    height: 1rem;
`

const More = styled.button`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 2rem;
`

const MoreImg = styled.img`
    width: 4px;
    height: 1rem;
`


export default UserInfo