import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authPost, reissueAccessToken } from '../../../Util/apis/api';

const Login = () => {
  const navigate = useNavigate();

  const autoLogin = useCallback(async()=>{
    try{
      const isLogin = await reissueAccessToken();
      
      if(isLogin){
        const role = localStorage.getItem("role");
        // 역할이 정해지지 않은 경우 or 서류 제출 안한 경우
        if(role==="ROLE_UNDEFINED" || role==="ROLE_UNSUBMIT_IP"){
          navigate("/user/join", { replace: true });
          return;
        }

        if(role === "admin"){//역할이 관리자인 경우
          localStorage.setItem("role","admin");
          navigate("/admin",{replace:true});
        }

        if(role === "ip"){//역할이 IP인 경우
          localStorage.setItem("role","ip");
          navigate("/help/ip", { replace: true });
        }

        if(role === "helper"){//역할이 Helper인경우
          localStorage.setItem("role","helper");
          navigate("/help/helper", { replace: true });
        }
      }
    }catch(err){
      console.log(err);
    }
  },[]);

  useEffect(()=>{
    autoLogin();
  },[autoLogin]);

  const kakaoLogin=()=>{
    //TODO : 카카오 로그인 요청 및 인가코드받기 
    window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_OAUTH_REDIRECT_URI}&response_type=code`;
  }

  const TestLogin=async()=>{
    const email = prompt("ID를 입력하세요");
    const password = prompt("PASSWORD를 입력하세요");
    const res = await authPost("/api/v1/test/member",{
      email,password
    })
    if(res){
      alert("TEST용 계정 로그인에 성공했습니다.");
    }
  }

  return (
    <LoginWrap>
      <Logo/>
      <KakaoLoginBtn src={`${process.env.PUBLIC_URL}/assets/kakaoLoginBtn.svg`} onClick={()=>kakaoLogin()} alt="카카오 로그인"/>
      <Btn onClick={TestLogin}>IP로그인</Btn>
      <Btn>Helper로그인</Btn>
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
  width: 100%;
  height: 100%;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
`
const Btn = styled.button`
  margin-left: 10%;
  width: 80%;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: #FEE500;
`
const KakaoLoginBtn = styled.img`
  height: 3rem;
  margin: 0 auto;
  cursor: pointer;
`
export default Login