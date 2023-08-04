import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch} from "react-redux";
import {setCookie} from "../../../cookie";
import {setTokenInfo,setRole} from "../../../store/Slice/userSlice.js";
import { useNavigate } from 'react-router';
const KaKaoOauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      if(data.role === "ROLE_IP_WAIT"){//DO : 서류대기중이면 로그인화면으로 Redirect
        alert("가입승인 대기중입니다!");
        navigate("/", { replace: true });
        return;
      }

      //DO : 토큰정보를 저장
      const refreshTokenInfo  = {
        refreshToken:data.refreshToken,
        refreshTokenExpireTime:data.refreshTokenExpireTime
      };
      setCookie("refreshTokenInfo",refreshTokenInfo,{
        path : "/",//쿠키를 접근할 수 있는 경로 지정
        secure : false,//HTTPS로만 접근 가능하게 할 것인지 지정
        httpOnly:true,//document.cookie를 이용해서 쿠키에 접속하는 것을 차단해 비정상적인 접근을 막는다.
        maxAge : 60*60*24*30*3 //초*분*시간*일*년
      });
      dispatch(setTokenInfo({
        accessToken:data.accessToken,
        accessTokenExpireTime:data.accessTokenExpireTime,
        grantType:data.grantType,
      }));
      dispatch(setRole(data.role));
      
      //DO : Role에 따라 페이지 라우팅
      switch(data.role){
        default :
        case "ROLE_UNDEFINED":
          navigate("/userSubmit", { replace: true });
          break;
        case "ROLE_IP":
          navigate("/ip", { replace: true });
          break;
        case "ROLE_HELPER":
          navigate("/helper", { replace: true });
          break;
        case "ROLE_ADMIN":
          break;
      }
      
      
    }).catch((err)=>{
      console.log(err);
    });
  },[dispatch,navigate])
  return (
    <></>
  )
}

export default KaKaoOauth