import axios from "axios";
import { useSelector } from "react-redux";

const token = useSelector(state=>state.user.token);
console.log(token);

export const setToken = (payload) => {
  token.setAccessToken(payload);
  console.log(token.getAccessToken());
}

export const setTokenExpireTime = (payload) => {
  token.setAccessTokenExpireTime(payload);
  console.log(token.getAccessTokenExpireTime());
}

export const reissueAccessToken = async ()=>{
  const refreshToken = localStorage.getItem("refreshToken");
  
  if(!refreshToken || refreshToken===""){
    return null;
  }

  try{
    const {data} = await axios({
      method:"post",
      url: process.env.REACT_APP_SERVER+"/api/v1/access-token/issue",
      headers:{"Authorization" : `Bearer ${refreshToken}`}
    });
    token.setAccessToken(data.accessToken);
    token.setAccessTokenExpireTime(data.accessTokenExpireTime);
    return data;
  }catch(err){
    console.log(err.response);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpireTime");
    token.clear();
    return null;
  }
}

export const authGet = async (url)=>{
  const refreshToken = localStorage.getItem("refreshToken");
  
  if(!refreshToken || refreshToken===""){
    return null;
  }

  if(token.check()){//엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if(res === null) return null;
    console.log("GET요청 : ",token.getAccessToken());
    const {data} = await axios({
      method:"get",
      url: process.env.REACT_APP_SERVER+url,
      headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
    });

    if(data.code === 200){
      return data.data;
    }
  }else{//엑세스 토큰이 사용가능한 경우
    try{
      const {data} = await axios({
        method:"get",
        url: process.env.REACT_APP_SERVER+url,
        headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
      });
  
      if(data.code === 200){
        return data.data;
      }
    }catch(err){
      console.log(err.response);
      return null;
    }
  }
}

export const authPost = async (url,json)=>{
  const refreshToken = localStorage.getItem("refreshToken");
  
  if(!refreshToken || refreshToken===""){
    return null;
  }

  if(token.check()){//엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if(res === null) return null;

    const {data} = await axios({
      method:"post",
      url: process.env.REACT_APP_SERVER+url,
      data:json,
      headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
    });

    if(data.code === 200){
      return data.data;
    }
  }else{//엑세스 토큰이 사용가능한 경우
    try{
      const {data} = await axios({
        method:"post",
        url: process.env.REACT_APP_SERVER+url,
        data:json,
        headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
      });
  
      if(data.code === 200){
        return data.data;
      }
    }catch(err){
      console.log(err.response);
      return null;
    }
  }
}

export const authDelete = async (url,json)=>{
  const refreshToken = localStorage.getItem("refreshToken");
  
  if(!refreshToken || refreshToken===""){
    return null;
  }

  if(token.check()){//엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if(res === null) return null;

    const {data} = await axios({
      method:"delete",
      url: process.env.REACT_APP_SERVER+url,
      data:json,
      headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
    });

    if(data.code === 200){
      return data.data;
    }
  }else{//엑세스 토큰이 사용가능한 경우
    try{
      const {data} = await axios.delete({
        method:"delete",
        url: process.env.REACT_APP_SERVER+url,
        data:json,
        headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
      });
  
      if(data.code === 200){
        return data.data;
      }
    }catch(err){
      console.log(err.response);
      return null;
    }
  }
}

export const authPut = async (url,json)=>{
  const refreshToken = localStorage.getItem("refreshToken");
  
  if(!refreshToken || refreshToken===""){
    return null;
  }

  if(token.check()){//엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if(res === null) return null;

    const {data} = await axios.put({
      method:"put",
      url: process.env.REACT_APP_SERVER+url,
      data:json,
      headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
    });

    if(data.code === 200){
      return data.data;
    }
  }else{//엑세스 토큰이 사용가능한 경우
    try{
      const {data} = await axios.put({
        method:"put",
        url: process.env.REACT_APP_SERVER+url,
        data:json,
        headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
      });
  
      if(data.code === 200){
        return data.data;
      }
    }catch(err){
      console.log(err.response);
      return null;
    }
  }
}

export const authFilePost = async (url,formData)=>{
  const refreshToken = localStorage.getItem("refreshToken");
  
  if(!refreshToken || refreshToken===""){
    return null;
  }

  if(token.check()){//엑세스 토큰이 없거나 사용불가능한 경우
    const res = await reissueAccessToken();
    if(res === null) return null;

    const {data} = await axios({
      method:"post",
      url: process.env.REACT_APP_SERVER+url,
      data:formData,
      headers:{
        'content-type': 'multipart/form-data',
        "Authorization" : `Bearer ${token.getAccessToken()}`
      },
    });

    if(data.code === 200){
      return data.data;
    }
  }else{//엑세스 토큰이 사용가능한 경우
    try{
      const {data} = await axios({
        method:"post",
        url: process.env.REACT_APP_SERVER+url,
        file:formData,
        headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
      });
  
      if(data.code === 200){
        return data.data;
      }
    }catch(err){
      console.log(err.response);
      return null;
    }
  }
}