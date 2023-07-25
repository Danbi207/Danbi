import axios from 'axios';
import React, { useEffect } from 'react'

const KaKaoOauth = () => {
  useEffect(()=>{
    //인가코드 서버에 전달 및 accesstoken받기
    const code = new URL(window.location.href).searchParams.get("code");
    const redirectUrl = `http://${window.location.hostname}${process.env.REACT_APP_KAKAO_OAUTH_REDIRECT_URI}`
    axios({
      method : "post",
      url : process.env.REACT_APP_KAKAO_OUATH__URI,
      data : {code,redirectUrl}
    }).then(({data})=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    });
  },[])
  return (
    <></>
  )
}

export default KaKaoOauth