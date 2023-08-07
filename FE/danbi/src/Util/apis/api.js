import axios from "axios";

export default class api{
  #accessToken = "";
  #accessTokenExpireTime = "";

  setAccessToken = (payload)=>{
    this.#accessToken = payload;
  }
  setAccessTokenExpireTime = (payload)=>{
    this.#accessTokenExpireTime = payload;
  }
  clear = () =>{
    this.#accessTokenExpireTime = "";
    this.#accessToken = "";
  }

  check = ()=>{
    return this.#accessToken==="" || (new Date()) >= (new Date(this.#accessTokenExpireTime));
  }


   reissueAccessToken = async ()=>{
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
      this.setAccessToken(data.accessToken);
      this.setAccessTokenExpireTime(data.accessTokenExpireTime);
      return data;
    }catch(err){
      console.log(err.response);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("refreshTokenExpireTime");
      this.clear();
      return null;
    }
  }
  
  authGet = async (url)=>{
    const refreshToken = localStorage.getItem("refreshToken");
    
    if(!refreshToken || refreshToken===""){
      return null;
    }
  
    if(this.check()){//엑세스 토큰이 없거나 사용불가능한 경우
      const res = await this.reissueAccessToken();
      if(res === null) return null;
      console.log("GET요청 : ",this.#accessToken);
      const {data} = await axios({
        method:"get",
        url: process.env.REACT_APP_SERVER+url,
        headers:{"Authorization" : `Bearer ${this.#accessToken}`},
      });
  
      if(data.code === 200){
        return data.data;
      }
    }else{//엑세스 토큰이 사용가능한 경우
      try{
        const {data} = await axios({
          method:"get",
          url: process.env.REACT_APP_SERVER+url,
          headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
  
  authPost = async (url,json)=>{
    const refreshToken = localStorage.getItem("refreshToken");
    
    if(!refreshToken || refreshToken===""){
      return null;
    }
  
    if(this.check()){//엑세스 토큰이 없거나 사용불가능한 경우
      const res = await this.reissueAccessToken();
      if(res === null) return null;
  
      const {data} = await axios({
        method:"post",
        url: process.env.REACT_APP_SERVER+url,
        data:json,
        headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
          headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
  
  authDelete = async (url,json)=>{
    const refreshToken = localStorage.getItem("refreshToken");
    
    if(!refreshToken || refreshToken===""){
      return null;
    }
  
    if(this.check()){//엑세스 토큰이 없거나 사용불가능한 경우
      const res = await this.reissueAccessToken();
      if(res === null) return null;
  
      const {data} = await axios({
        method:"delete",
        url: process.env.REACT_APP_SERVER+url,
        data:json,
        headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
          headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
  
  authPut = async (url,json)=>{
    const refreshToken = localStorage.getItem("refreshToken");
    
    if(!refreshToken || refreshToken===""){
      return null;
    }
  
    if(this.check()){//엑세스 토큰이 없거나 사용불가능한 경우
      const res = await this.reissueAccessToken();
      if(res === null) return null;
  
      const {data} = await axios.put({
        method:"put",
        url: process.env.REACT_APP_SERVER+url,
        data:json,
        headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
          headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
  
  authFilePost = async (url,formData)=>{
    const refreshToken = localStorage.getItem("refreshToken");
    
    if(!refreshToken || refreshToken===""){
      return null;
    }
  
    if(this.check()){//엑세스 토큰이 없거나 사용불가능한 경우
      const res = await this.reissueAccessToken();
      if(res === null) return null;
  
      const {data} = await axios({
        method:"post",
        url: process.env.REACT_APP_SERVER+url,
        data:formData,
        headers:{
          'content-type': 'multipart/form-data',
          "Authorization" : `Bearer ${this.#accessToken}`
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
          headers:{"Authorization" : `Bearer ${this.#accessToken}`},
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
}