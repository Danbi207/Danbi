import React,{useEffect,useCallback} from 'react'
import styled from 'styled-components';
import { authGet, reissueAccessToken } from '../../../Util/apis/api';
import {setUserInfo} from "../../../store/Slice/userSlice";
import { useNavigate } from 'react-router-dom';
import { requestPermission } from '../../../Util/hooks/requestPermission';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const autoLogin = useCallback(async()=>{
    const isLogin = await reissueAccessToken();
    
    if(isLogin){
      const role = localStorage.getItem("role");
      if(role==="ROLE_UNDEFINED"){//역할이 정해지지 않은 경우
        // navigate("/user/join", { replace: true });
        return;
      }
      
      // FCM 토큰 함수 호출
      requestFcmToken()

      //유저정보 저장
      getUserInfo();

      if(role === "ROLE_IP"){//역할이 IP인 경우
        localStorage.setItem("role","ip");
        navigate("/help/ip", { replace: true });
      }

      if(role === "ROLE_HELPER"){//역할이 Helper인경우
        localStorage.setItem("role","helper");
        navigate("/help/helper", { replace: true });
      }
    }
  },[navigate,requestFcmToken,getUserInfo]);

  useEffect(()=>{
    autoLogin();
  },[autoLogin]);
 
  const kakaoLogin=()=>{
    //TODO : 카카오 로그인 요청 및 인가코드받기 
    window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_OAUTH_REDIRECT_URI}&response_type=code`;
  }
  return (
    <LoginWrap>
      <Logo/>
      <KakaoLoginBtn src={`${process.env.PUBLIC_URL}/assets/kakaoLoginBtn.svg`} onClick={()=>kakaoLogin()} alt="카카오 로그인"/>
    </LoginWrap>
  )
}

const Logo = styled.div`
  background-image: url(${props=>props.theme.images.logo});
  background-repeat: no-repeat;
  background-position: left;
  height: 15rem;
  margin-bottom:3rem;
`

const LoginWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  width: 28rem;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  height: 100%;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
`

const KakaoLoginBtn = styled.img`
  @media screen and (max-width: 500px) {
    height: 3rem;
  }
  height: 3.5rem;
  margin: 0 auto;
  cursor: pointer;
`
export default Login