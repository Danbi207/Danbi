import axios from "axios";
import { Token } from "../private/token";

const token = new Token();
console.log("TEST"+token.getAccessToken());
export const setToken = (payload) => {
  token.setAccessToken(payload);
}

export const setTokenExpireTime = (payload) => {
  token.setAccessTokenExpireTime(payload);
}

export const reissueAccessToken = ()=>{
  const refreshToken = localStorage.getItem("refreshToken");
  
  if(!token.check() || !refreshToken || refreshToken===""){
    return -1;
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
    return -1;
  })

  return 1;
}

export const authGet = async (url,options)=>{
  if(token.check()){//access토큰을 못 쓰는 경우
    if(reissueAccessToken()=== -1) return null;
    return await authGet(url,options);
  }else{//토큰을 쓸 수 있는 경우
    try{
      const {data} = await axios.get(url,{
        ...options,
        headers:{"Authorization" : "Bearer "+token.getAccessToken()},
      });

      return await data.data;
    }catch(err){
      console.log(err);
      return null;
    }
  }
}

export const authPost = async (url,options)=>{
  if(token.check()){//access토큰을 못 쓰는 경우
    if(reissueAccessToken()=== -1) return null;
    return await authPost(url,options);
  }else{//토큰을 쓸 수 있는 경우
    try{
      const {data} = await axios.post(url,{
        ...options,
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

export const authDelete = async (url,options)=>{
  if(token.check()){//access토큰을 못 쓰는 경우
    if(reissueAccessToken()=== -1) return null;
    return await authDelete(url,options);
  }else{//토큰을 쓸 수 있는 경우
    try{
      const {data} = await axios.delete(url,{
        ...options,
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

export const authPut = async (url,options)=>{
  if(token.check()){//access토큰을 못 쓰는 경우
    if(reissueAccessToken()=== -1) return null;
    return await authPut(url,options);
  }else{//토큰을 쓸 수 있는 경우
    try{
      const {data} = await axios.put(url,{
        ...options,
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