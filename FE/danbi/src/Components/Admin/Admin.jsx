import React, {useState, useCallback, useEffect } from 'react'
import {authGet, authPost, reissueAccessToken} from "../../Util/apis/api";
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useMemo } from 'react';

const pagingCount = 5;

const Admin = () => {
  const navigate = useNavigate();
  const [mode,setMode] = useState("ALL");
  const [size,setSize] = useState(10);
  const [direction,setDirection] = useState("DESC");
  const [total,setTotal] = useState(0);
  const [curPage,setCurPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const [startPage,setStartPage] = useState(0);
  const [endPage,setEndPage] = useState(0);
  const [users,setUsers] = useState([]);

  useEffect(()=>{
    let _totalPage=totalPage;
    let _startPage=startPage;
    let _endPage=endPage;
    if(total===0){
      _totalPage=0;
      _startPage=0;
      _endPage=0;
    }else{
      // 전체 페이지 개수 구하기(전체 글의 수 / 한 화면에 보여질 행의 수)
			// 정수와 정수의 나눗셈의 결과는 정수이므로 13 / 7 = 1
			_totalPage=Math.floor(total / size);
			// 보정해줘야 할 경우는? 나머지가 0보다 클 때
			if(total % size > 0) {
				// 전체페이지수를 1증가 처리
				_totalPage=(_totalPage+1);
			}
			
			// startPage : '이전 [1] [2] [3] [4] [5] 다음' 일때 1을 의미
			// 공식 : 현재페이지 / 페이징의 개수 * 페이징의 개수 + 1;
			_startPage=(Math.floor(curPage / pagingCount) * pagingCount + 1);
			// 보정해줘야 할 경우는? 5 / 5 * 5 + 1 => 6 경우처럼
			// 					현재페이지 % 5 === 0 일 때 
			if(curPage % pagingCount === 0) {
				// startPage = startPage - 5(페이징의 개수)
				_startPage=(_startPage-pagingCount);
			}
			
			// endPage   : '이전 [1] [2] [3] [4] [5] 다음' 일때 5을 의미
			_endPage=(_startPage + pagingCount - 1);
			// 보정해줘야 할 경우는? endPage > totalPage 일때
			//					endPage를 totalPage로 바꿔줘야 함 
			if(_endPage > _totalPage) {
				_endPage=(_totalPage);
			}
    }
    setTotalPage(_totalPage);
    setStartPage(_startPage);
    setEndPage(_endPage);
  },[total,size,curPage]);

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

  const pageItems = useMemo(()=>{
    const res = [];
    for(let i = startPage; i <= endPage; i++){
      res.push(<PageItem $curPage={i===curPage} key={i} onClick={()=>setCurPage(i)}>{i}</PageItem>)
    }
    return res;
  },[startPage,endPage,curPage])
 
  useEffect(()=>{
    //DO : 관리자체크함수 호출
    checkRole();
  },[checkRole]);

  useEffect(()=>{
    //DO : 멤버수를 조회 및 저장
    const getMember = async() =>{
      try{
        if(mode==="ALL"){
          const data = await authGet(`/api/v1/admin/member?page=${curPage}&size=${pagingCount}&sort=id&direction=${direction}`); 
          if(data){
            console.log(data);
            setUsers(data.members);
            if(total !== data.count) setTotal(data.count);//FIXME : 회원수 받기 서버에서 완료되면 지우기
          }
        }else{
          const data = await authGet(`/api/v1/admin/member/role?memberRole=${mode}&page=${curPage}&size=${pagingCount}&sort=id&direction=${direction}`); 
          if(data){
            setUsers(data.members);
            if(total !== data.count) setTotal(data.count);
          }
        }
      }catch(err){
        console.log(err);
      }
    }
    getMember();
    
  },[mode,curPage,pagingCount,direction,size]);

  const tableItems = useMemo(()=>{
    if(!users){return [];}
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
      <SearchWrap>
        <div>
          <div>역할</div>
          <select onChange={e=>{
            setMode(e.target.value);
            setCurPage(1);
          }}>
            <option value={"ALL"}>전체</option>
            <option value={"HELPER"}>Helper</option>
            <option value={"IP"}>Ip</option>
            <option value={"UNCERTIFICATED"}>서류승인 대기</option>
            <option value={"UNSUBMIT"}>서류 미제출</option>
          </select>
        </div>
        <div>
          <div>개수</div>
          <select onChange={e=>{
            setSize(e.target.value);
            setCurPage(1);
          }}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <div>정렬</div>
          <select onChange={e=>{
            setDirection(e.target.value);
            setCurPage(1);
          }}>
            <option value={"DESC"}>DESC</option>
            <option value={"ASC"}>ASC</option>
          </select>
        </div>
      </SearchWrap>
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
      <PageWrap>
        <button onClick={()=>setCurPage(1)}>처음</button>
        <button onClick={()=>{if(startPage-pagingCount > 0)setCurPage(startPage-pagingCount)}}>이전</button>
        {
          pageItems
        }
        <button onClick={()=>{if(endPage!==totalPage) setCurPage(endPage+1)}}>다음</button>
        <button onClick={()=>setCurPage(totalPage)}>끝</button>
      </PageWrap>
    </Wrap>
  )
}

const PageItem = styled.button`
  font-size: ${props=>props.$curPage? "1.5rem" : "1rem"};
`

const SearchWrap = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 2rem;
  & > div{
    display: flex;
    gap: 1rem;
  }
`
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
`
const PageWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`
const MainWrap = styled.table`
  width: 100%;
  border-collapse: collapse;
  & thead,tbody,td,th,tr{
    border: 1px solid ${props=>props.theme.colors.titleColor};
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