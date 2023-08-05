import React,{useEffect,useState,useCallback} from 'react'
import styled from 'styled-components';
import { authGet, reissueAccessToken } from '../../Util/apis/api';

const Login = () => {
  const [userInfo,setUserInfo] = useState();
  const getData = useCallback(async ()=>{
    //DO : API분리 테스트용 코드, 유저정보를 불러와 저장
    const data = await authGet("/api/v1/profile/1");
    console.log(data);
    setUserInfo(data);
  },[]);

  useEffect(()=>{
    //DO: 데이터 확인 코드
    console.log(userInfo);
  },[userInfo]);

  useEffect(()=>{
    //DO : AccessToken재발행
    reissueAccessToken();
    getData();
  },[getData]);
  
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