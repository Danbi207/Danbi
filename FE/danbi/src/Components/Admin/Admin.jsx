import React, { useCallback, useEffect } from 'react'
import {reissueAccessToken} from "../../Util/apis/api";
const Admin = () => {
  const checkRole = useCallback(async()=>{
    const data = await reissueAccessToken();
    if(data){
      console.log(data);
    }
  },[])
  useEffect(()=>{
    checkRole();
  },[checkRole])
  return (
    <div>Admin</div>
  )
}

export default Admin