import axios from "axios";
import { Token } from "../private/token";

const token = new Token();

export const setToken = (payload) => {
  token.setAccessToken(payload);
}

export const setTokenExpireTime = (payload) => {
  token.setAccessTokenExpireTime(payload);
}

const authInstance = (url,options)=>{
  axios.create({
    baseURL : url,
    headers:{"Authorization" : `Bearer ${token.getAccessToken()}`},
    ...options,
  });
}

export const reissueAccessToken = ()=>{
  const refreshToken = localStorage.getItem("refreshToken");
  if(!token.check() || !refreshToken || refreshToken===""){
    return true;
  }

  axios({
    method:"post",
    url:"/api/v1/access-token/issue",
    headers:{"Authorization" : `Bearer ${refreshToken}`}
  }).then(({data})=>{
    token.setAccessToken(data.accessToken);
    token.setAccessTokenExpireTime(data.accessTokenExpireTime);
  }).catch(err=>{
    console.log(err.response);
    localStorage.removeItem("refreshToken");
    token.clear();
    return true;
  })

  return false;
}

export const authGet = async (url,options)=>{
  try{
    const {data} = await authInstance(url,options).get();

    if(data.code === 500){
      //DO : 토큰만료시 재발급요청
      if(reissueAccessToken()){

        return null;
      }

      return await authGet(url,options);
    }

    if(data.code === 200){
      return data.data;
    }
  }catch(err){
    console.log(err.response);
    return null;
  }
}

export const authPost = async (url,options)=>{
  try{
    const {data} = await authInstance(url,options).post();

    if(data.code === 500){
      //DO : 토큰만료시 재발급요청
      if(reissueAccessToken()){
        return null;
      }

      return await authPost(url,options);
    }

    if(data.code === 200){
      return data.data;
    }
  }catch(err){
    console.log(err.response);
    return null;
  }
}

export const authDelete = async (url,options)=>{
  try{
    const {data} = await authInstance(url,options).delete();

    if(data.code === 500){
      //DO : 토큰만료시 재발급요청
      if(reissueAccessToken()){
        return null;
      }

      return await authDelete(url,options);
    }

    if(data.code === 200){
      return data.data;
    }
  }catch(err){
    console.log(err.response);
    return null;
  }
}


export const authPut = async (url,options)=>{
  try{
    const {data} = await authInstance(url,options).put();

    if(data.code === 500){
      //DO : 토큰만료시 재발급요청
      if(reissueAccessToken()){
        return null;
      }

      return await authPut(url,options);
    }

    if(data.code === 200){
      return data.data;
    }
  }catch(err){
    console.log(err.response);
    return null;
  }
}

const defaultInstance = (url,options)=>{
  axios.create({
    baseURL : url,
    ...options,
  });
}