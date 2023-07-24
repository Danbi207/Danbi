import axios from 'axios';
import React, { useEffect } from 'react'

const KaKaoOauth = () => {
  useEffect(()=>{
    //인가코드 서버에 전달 및 accesstoken받기
    const code = new URL(window.location.href).searchParams.get("code");
    alert(process.env.REACT_APP_KAKAO_OUATH__URI);
    axios({
      method : "post",
      url : process.env.REACT_APP_KAKAO_OUATH__URI,
      data : {code}
    }).then(()=>{
      alert("성공");
    }).catch(()=>{
      alert("실패");
    });
  },[])
  return (
    <></>
  )
}

export default KaKaoOauth