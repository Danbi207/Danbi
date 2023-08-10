import React, {useState, useCallback, useEffect } from 'react'
import {authGet, authPost, reissueAccessToken} from "../../Util/apis/api";
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useMemo } from 'react';
const Admin = () => {
  const navigate = useNavigate();
  const [mode,setMode] = useState("all");
  const [users,setUsers] = useState([
    {
        "id": 6,
        "oauthType": "KAKAO",
        "email": "jyj1143@gmail.com",
        "name": "조영재",
        "nickname": "조영재",
        "profileUrl": "http://k.kakaocdn.net/dn/bgLq4P/btrWcLGVpZz/YCMKcFHYdLvTdI1FGIndn1/img_110x110.jpg",
        "role": "ROLE_HELPER",
        "gender": "male",
        "state": "ACTIVATE",
        "accuseStack": 0
    },
    {
        "id": 5,
        "oauthType": "KAKAO",
        "email": "hm03048@naver.com",
        "name": "김윤욱",
        "nickname": "김윤욱",
        "profileUrl": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
        "role": "ROLE_HELPER",
        "gender": "male",
        "state": "ACTIVATE",
        "accuseStack": 0
    },
    {
        "id": 4,
        "oauthType": "KAKAO",
        "email": "vkflek1232@naver.com",
        "name": "한승현",
        "nickname": "한승현",
        "profileUrl": "http://k.kakaocdn.net/dn/bfaaoP/btsa6GJU1Bv/Wri9wb6ZJGuL5t9VGnKrrk/img_110x110.jpg",
        "role": "ROLE_ADMIN",
        "gender": "male",
        "state": "ACTIVATE",
        "accuseStack": 0
    },
    {
        "id": 3,
        "oauthType": "KAKAO",
        "email": "wwwttt123@naver.com",
        "name": "강민석",
        "nickname": "강민석",
        "profileUrl": "http://k.kakaocdn.net/dn/bS2wdw/btreVxvFriB/kFFiMJpfHdDtEc6qnuqPQ0/img_110x110.jpg",
        "role": "ROLE_IP",
        "gender": "male",
        "state": "ACTIVATE",
        "accuseStack": 0
    },
    {
        "id": 2,
        "oauthType": "KAKAO",
        "email": "melon212@naver.com",
        "name": "김민규",
        "nickname": "김민규",
        "profileUrl": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
        "role": "ROLE_HELPER",
        "gender": "male",
        "state": "ACTIVATE",
        "accuseStack": 0
    },
    {
        "id": 1,
        "oauthType": "KAKAO",
        "email": "omygog@naver.com",
        "name": "윤태웅",
        "nickname": "윤태웅",
        "profileUrl": "http://k.kakaocdn.net/dn/JqjzO/btrG3p5w1IG/hIKGwYLKCdhUh12Cx3qQk1/img_110x110.jpg",
        "role": "ROLE_IP",
        "gender": "male",
        "state": "ACTIVATE",
        "accuseStack": 0
    }
]);
  const checkRole = useCallback(async()=>{
    //DO : 관리자인지 체크
    try{
      const data = await reissueAccessToken();//localstorage가 비워져 있는경우 or localstorage를 조작한 경우를 대비하기 위해 accessToken을 재발급해 확인
      if(data){
        if(localStorage.getItem("role")!=="admin"){//관리자가 아닌 경우
          await authPost("api/v1/member/logout");//로그아웃처리
          localStorage.removeItem("role");//localstorage clear
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("refreshTokenExpireTime");
  
          navigate("/",{replace:true});//로그아웃 페이지로 으로 이동
        }
      }
    }catch(err){
      console.log(err);
    }
  },[navigate]);

  useEffect(()=>{
    //DO : 관리자체크함수 호출
    checkRole();
  },[checkRole]);

  // useEffect(()=>{
  //   //DO : 멤버수를 조회 및 저장
  //   const getMember = async() =>{
  //     try{
  //       const data = await authGet("/api/v1/admin/member"); 
  //       setUsers(data);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   getMember();
    
  // },[mode]);

  useEffect(()=>{
    console.log(users);
  },[users])

  const tableItems = useMemo(()=>{
    const res = [];
    users.forEach((e,idx)=>{
      res.push(<tr key={idx}>
        <td>{e.id}</td>
        <td>{e.oauthType}</td>
        <td>{e.email}</td>
        <td>{e.name}</td>
        <td>{e.nickname}</td>
        <td>{e.role}</td>
        <td>{e.gender}</td>
        <td>{e.accuseStack}</td>
        <td>{e.state}</td>
      </tr>);
    });
  return res;
  },[users]);

  return (
    <Wrap>
      <TapWrap>
        <TapItem $mode={mode==="all"} onClick={()=>setMode("all")}>전체</TapItem>
        <TapItem $mode={mode==="helper"} onClick={()=>setMode("helper")}>Helper</TapItem>
        <TapItem $mode={mode==="ip"} onClick={()=>setMode("ip")}>Ip</TapItem>
        <TapItem $mode={mode==="uncertificated"} onClick={()=>setMode("uncertificated")}>서류승인 대기</TapItem>
        <TapItem $mode={mode==="unsubmit"} onClick={()=>setMode("unsubmit")}>서류 미제출</TapItem>
      </TapWrap>
      <MainWrap>
        <colgroup>
          <col width="5%" />
          <col width="10%"/>
          <col width="25%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="15%"/>
          <col width="10%"/>
          <col width="5%"/>
          <col width="10%"/>
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>가입유형</th>
            <th>이메일</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>Role</th>
            <th>성별</th>
            <th>신고횟수</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {
            tableItems
          }
        </tbody>
      </MainWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
`

const TapWrap = styled.div`
  display: flex;
  align-items: end;
`

const TapItem = styled.div`
  cursor: pointer;
  border: 1px solid ${props=>props.theme.colors.titleColor};
  border-bottom: none;
  width: 8rem;
  text-align: center;
  height : ${props=>props.$mode ? "2rem" : "1.5rem"};
  line-height: ${props=>props.$mode ? "2rem" : "1.5rem"};
`

const MainWrap = styled.table`
  width: 100%;
  border-collapse: collapse;
  & thead,tbody,td,th,tr{
    border: 1px solid #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  & tr{
    cursor: pointer;
  }
  & tbody>tr:hover{
    height: 2rem;
  }
`

export default Admin