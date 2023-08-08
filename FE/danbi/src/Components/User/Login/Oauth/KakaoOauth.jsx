  import axios from 'axios';
import React, { useEffect ,useCallback} from 'react';
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router';
import { authGet, setToken,setTokenExpireTime } from '../../../../Util/apis/api';
import {setUserInfo} from "../../../../store/Slice/userSlice";
import {requestPermission} from '../../../../Util/hooks/requestPermission';

const KaKaoOauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = useCallback(async () => {
    await authGet("/api/v1/member/logout");
    
    setToken("");
    setTokenExpireTime("");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpireTime");
  },[])  

  const getUserInfo = useCallback(async()=>{
    try{
      const data = await authGet("/api/v1/member");
      if(data){
        dispatch(setUserInfo(data));
        console.log(data);
      }
    }catch(err){
      console.log(err.response);
    }
  },[dispatch]);

  // FCM 토큰 함수 호출
  const  requestFcmToken = useCallback(async ()=> {
    await requestPermission()
  },[])
 

  useEffect(()=>{
    //FIXME : 자동 로그인 로직
    //인가코드 서버에 전달 및 accesstoken받기
    const code = new URL(window.location.href).searchParams.get("code");
    const redirectUrl = `${process.env.REACT_APP_KAKAO_OAUTH_REDIRECT_URI}`
    axios({
      method : "post",
      url : process.env.REACT_APP_KAKAO_OUATH__PATH,
      data : {code,redirectUrl} 
    }).then(({data})=>{
      console.log(data);
      setToken(data.accessToken);
      setTokenExpireTime(data.accessTokenExpirationTime);
      
      //DO : 토큰정보를 저장
      localStorage.setItem("refreshToken",data.refreshToken);
      localStorage.setItem("refreshTokenExpireTime",data.refreshTokenExpireTime);
      
      
      if(data.role === "ROLE_UNCERTIFICATED_IP"){//서류제출까지 완료하였으나 허가안나는 경우
        logout();
        navigate("/",{replace:true});
        alert("서류승인 중입니다. 서류승인이 완료되면 로그인이 가능합니다.");
      }
    
      // FCM 토큰을 요청
      requestFcmToken();

      // 역할이 정해지지 않은 경우 or 서류 제출 안한 경우
      if(data.role==="ROLE_UNDEFINED" || data.role==="ROLE_UNSUBMIT_IP"){
        localStorage.setItem("role",data.role);
        navigate("/user/join", { replace: true });
        return;
      }

      //유저정보 조회 및 저장
      getUserInfo()

      if(data.role === "ROLE_IP"){//역할이 IP인 경우
        localStorage.setItem("role","ip");
        navigate("/help/ip", { replace: true });
      }

      if(data.role === "ROLE_HELPER"){//역할이 Helper인경우
        localStorage.setItem("role","helper");
        navigate("/help/helper", { replace: true });
      }


    }).catch((err)=>{
      console.log(err);
    });
  },[dispatch,navigate,logout,requestFcmToken,getUserInfo])
  return (
    <></>
  )
}

export default KaKaoOauth