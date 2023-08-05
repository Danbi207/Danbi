import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router';
import { setToken,setTokenExpireTime } from '../../../Util/apis/api';
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
      localStorage.setItem("refreshToken",data.refreshToken);
      localStorage.setItem("refreshTokenExpireTime",data.refreshTokenExpireTime);
      localStorage.setItem("role",data.role);
      
      setToken(data.access_token);
      setTokenExpireTime(data.access_token_expiration_time);
      
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