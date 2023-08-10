import React, { useCallback, useEffect } from 'react'
import {authGet, authPost, reissueAccessToken} from "../../Util/apis/api";
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  const navigate = useNavigate();
  const checkRole = useCallback(async()=>{
    //DO : 관리자인지 체크
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
  },[navigate]);

  useEffect(()=>{
    //DO : 관리자체크함수 호출
    checkRole();
  },[checkRole]);

  return (
    <div>Admin</div>
  )
}

export default Admin