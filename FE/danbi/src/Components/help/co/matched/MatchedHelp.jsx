import React,{ useState,useEffect,useCallback } from 'react'
import Header from "../Common/Header/Header.jsx"
import Footer from "../Common/Footer/Footer.jsx"
import Tap from "./tap/Tap.jsx"

import styled from 'styled-components';

import Infomation from './main/infomation/Infomation.jsx';
import Chat from './main/chat/Chat.jsx';
import RealtimeMap from './main/realtimeMap/RealtimeMap.jsx';
import { useParams } from 'react-router-dom';

import axios from 'axios';
const MatchedHelp = () => {
  const [mode,setMode] = useState("Infomation");
  const [help, setHelp] = useState();
  const { helpPostId } = useParams();
  const [curposition,setCurPosition] = useState(null);
  const [watchID,setWatchID] = useState(null);
  const myProfile = {
    "user_id" : 1,
    "profile_id" : 1,
    "name" : "김민규",
    "profile_url" : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFRUVFRUVFRUVFRUQFRUWFxUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0mHx8tLSsrLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLf/AABEIALwBDAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABAgADBAUGBwj/xAA/EAACAQIEAwQHBwAJBQAAAAAAAQIDEQQFITESQVEGYXGRBxMiQoGhsTJSYnLB0fAUIzNDgqKy4fEVJFOSs//EABkBAAMBAQEAAAAAAAAAAAAAAAABAwQCBf/EACURAAICAgIBAwUBAAAAAAAAAAABAhEDEgQhMSJBURMUIzJxQv/aAAwDAQACEQMRAD8A8oSCQJEqQIBhDIAIRAAKQUFAAEQawAAiCSwyQAbfKkdLRWhzmVI6aitCEykRjmO0Gc3bo0nr77XL8Ke3izF7R9om3KlSdoptSmt5Pmo9Fyucu6rekdI+XzK48XuzmU0Z8q1OG7TfSP7v9BFjIyaWqXj/AMGPQwnFqp013Xd33bFVWpyaX6Muook5s3cK8aasm7vVO+z5b9e+3iKswbfDNLXnqk/2NLTq203W3guhZCvpZ/x9UGiBzZm4qooWcdHfVNX8vHQ2OWe2uF24Wn9rXhb2svG3maqhLiUuLW0Gl5q36luCxDhpH7XV30FJdUEX3ZMXhJU5XvbfVK11+psst7VVKSjCUVKK8eK19k72KMZVVRJu/Fq23vJJaLpv8vE01SCu+bvrzEkpL1HTdPo9Zw9eM4qUWmmrrwZbY8zyfG1Kc48Dd1dKPKz3bv4/M9Lpz4kpLZpNeD2MmTHoy0JbEsBocliZ2VtCtFjQrQxFTQkkWyQrQDKJIwK61NlJGNOjdlIPs4krOEQQBRoJECkQZCAFiWGRAAiQbETGQDASwwUACpDIIUhDo22WO2pb2hz31VPgh9qSaT5RVt+8wnWUKUpO+3K2/Lc5LGV5TleTb73+gRhs7YpSpCxd9Xshb338gSelv5c2WT5TOu7RWhobS7ZFJt0jBku4yMFh+OSTfnzO+yvsHDT1km+tjpsL2Jwqs/V6rnczS5cF0Xjxpvyed1Oyc+G8dbq6+en0NbXyOcXZp7Xfcz3Chk0VHhV7fQSPZyDfFLXusR+7K/bHjdPLnCnKTi7tWjp37v5mq9a4t/U+hMV2fpyjrFP4XOB7Q9hnrKnZ87P9Gh4uXGT7Fk47S6OBw7hvK8lzV7L49S2rUjJ6QSXuxjzdt2+f88CzFZZKno6dut9SiE1FPl4PXwNdp9ozU10xJT9WrJ+23q+kU78KfjbyPSsprqdKEltZWXclY8tn7TvdP4nc9icXek6cnZxlp4S1XzuSzx9NlMb7OlsBj2AYy4jFaLGhWAFbQkkWtCtDApkiuxdJCWO4iZ5whkhkhkjVZAVIZINg2EMFgWHSJYAFsEexLAMRDDqIUhWFCJDoNiCsYub/ANjvaz26/A5yW5uc8lpFeL/nzNK2WxrojPyNRhxSSR6x2SytU4WS1dmzzDKvtp96PasnWi8DPy5VGjRxY22zbYSibOjEw6EdTZUIM8teTay2nSLVRLKa0LFE0OCont2I4K1jW4qibOcWYleJDWmUs5HPMmhO/s8jyfP8B6mo1y5fy57pi46M8j9IcbVX5+aN/Ek9qMnISqzi6tVe6rdd2/8AY23ZbMnTq8L1jNOD/R/B/qaaa1uZWUL+vpLrUgvg5JfRm6STTMafZ7BYjQ7Qtjy7NolgNDsDQAVtCNFrQjQwKpIRItkhUjuImecIZASGSNRAiQxEhkhHQCB4QpAAEFBsGwgAiDWDYLGKRDWIkIDJqZaq9Ph2ktn3nHyXy+p6FlCOb7WZX6mo5JezUfEn0evFHzaZ3jn3RxOPVmDkNHjrQj33fgj2fLFovA8u7C0b1pPpGx6DisPOVkpWSWydrvvM/L9UlE08ZVBs6bDY6mveXmbvC4iMlo0eYyyGlN/12KUH0UrJGdgsrnhmnTrynD83EiH0saV2d7TbPS4VEP6xdTn8uxjkrc7FmOryS00YlJUOmbmdUx51IvmvM4rE0sXVdliVTXVpfqKssxEP79Ve+OjT8E2h/Si1aYt5L2OlxcbOx5X6UsPaUJrvi/qv1O/wM6z9mpquT2aOX9JmGvh+LpJeR3huORHOX1QZ5Olf6md2ep8eKore1SDfwkmXdnMpliK8YKLcU06j6U93fxtbxZ03Zfs/GOKq1Y/2dOpONPneWqtd/du14m/JkUUzHGDfZ2dgD2BY8w1CWA0PYVjArYrRY0KxgVSRKdJvZXHUG3Zbs6PCYJQil5+Jow49ieWep4kkNYCYUVOBrBsBDIQyWIkElxDIGwAgASEQUICWJYaxAA3OULYyu1mF48JUlzguLrpezXz+RjZQdJLDKrRqUn/eU5wX5mtCcnUkzuKvo5H0aYXic5d6R6Ljsqc4WjK2n8scL6LqySqU3pKMk2vNfVHq+Fs0Z+TJ/WZfAvxo4Ot2UhOEEqihOM+L1klxSb/FxfCxs8ryKNGCjGd3ducknFTTttFaJpLRrnfqdj/RYb8K8ijERSVlodPM1GmPRN2kYuQ4Zp9f2MvM6N9Ni/KjIxiuZoybO5I4PNMinXUl671crrhabtGK5Pa7YuG7L1KacliL1G0+JK0dPd9Xdqz7rd1juoUIvki2OFitomtTlrRJpXZpcDhJqK49+t9znu32EcsLU02XF5O/0O2qqxznauf/AG9Rc5RcV+aWi+bJxb2Q2umeceieCeIrRel6Lt48asdjh6EYRUIq0UrJHPejHBpVsTV92N4X6NXlv8fodMi/IfrIQVRQrQBwMgdCNAYwGACNCMsYqjfRHSAzskw3FLiey+ptatXV2Dg6KhBRK5UGerigoxo8/JPZ2eIJDJEQUZzSFDAQyEzoliWCAQBRLEQQANgpAQRAMggQQA3OUcjpqK0Oayg6ehsRyHcTnchyqWGxVWWnBNvgfVN3cX4NLzZ6HlmLTVjlc2ajBTfuzhLwSmuJ+VzZRbg7rZ/Uhl9TUmaMTVUdZ681+Iq8UlFO2ur7kV4efEtSrG4XjjaMuFrZpX8yf7KiipG8yuUVszKrq+lziMDQxdFtKUq0XreyUk/hZNGz9TialpOpKn+FcLuvxXX0sdRxUqOXNWbmliuHSXWxl+uTNYsP7Oru+b2K6U3HRnabRy6ZnYmpoc3naUlrslKbS1bUVskv5sbac3JnNVavHiKr92HDSX5kuKb85pf4Rr5OG6Nf2YwLoYfgekpzlVmujk/Zj32ikbMJAlK3bOACsdgZyAgGOKxgIzJy+lduXJfUx2bONPhpxjzl7T+Jq4mPfJ/CPInrD+jSxPtp8tjaxjfuMHA4N34pLRbGfCZ6cq9jBGzwJDIVBRhNwwyFQ6EzoIA2JYQEQSJBsIAoILBsABJchAGbvKOR09DY5fKDqKGxGZ1Exs8pcWHqxte9OSt1dmDsxmaxOFhN/aS4Z/njo38d/iZ9jXU8PDDzlKmuFTd5JbX2bJSpxopjvY6LDTfDda8rGvqZzXi7f0eXjxQ69Ll2W4vhn+FmwxVOMttGSUlHyi9d9mLhc7rp3dCVuel7ru4WzMqZzWesaEmulrP4uTQmF9bD7K7t+RlwhUn9rT4mhSjQ3pZh/wDUsRNaUV33klbyvdmdRi7Jy6GZSgoowK83e72ISdk+vYTMMZGjSnVltGLk/BLZd5z+BpcMe+TlOX55vik/Nsz82frEov7N1dcmlrr8bFCRTwqJPyEhCHIgEZCAAorHYAAfB0OOaj3/ACOsVGO7WtvJGq7NYe7lN8tEb1wPS4y1hfyZMzuX8KZaow3CxnziY8nHnuaYkGfPqYyESHRkNgyGQqRYkcsZCBAIA3CAgAFMNwJBAYUEVDCA3OUM6ihsctlHI6SeIjTpuc3aMVdvu/clM6RVnOb08NT46j7oxX2pPov3Mbs9mX9OpTqer4EpuCXFxXtGLu3ZfePP86x1TG1unE1CnFvSMW0lfve7PWOy+Vxw9GNKOy3f3pv7Un8TnkRWPGl/pnXHblNv2Rq6GJdKXBLa+j6dx1uEkpxTNXnOVKabS1NFhMxq4d8O8enNeBBx379zU/lHoFDoZkbHD0u0yf3vCzNjQz2T2i/odKDRNts6Ooklc0+JrcTsthZ16k17Tsui/cEKYVRyYuJ3SKh6z9piICZCMhAAgAkAACjAYAdV2fpWop9bs2EkYmSVU6Ue5WMxnrwVRRgk7bKXqzGqYfUzLWuFMpbOKPnKwUgIKMZsGQyEQyEMcBCXEAUEAQGMQAAAJLlFbEKK6mDUxkn3HcYNnDmkdNgsbTpK85JfXyNT2kz14i0IXVOOtnvKXV/ojTTfeKzuOJJ2cSm2LFtNNOzWqfRrZnufZfEqtQp1V70bvuls153PDUeneiPH3jVw791+sivwS0lb/Ev8xLl49oX8FOPPWVfJ38qVzn84ym74kjqVETEUFJWMSRsUqOEo5e4yu0dBSwNkpaF9bB8gUMK9rsNmd2mg043L+GxfSo8yqs9GxEmcf2czlYmM2/twqTi1+HifBLy+jNseVZTmM8JianDqlUnGUXtKPE7f8nfZZ2io1rK/BL7stNe57M0ZsLTuPgzwnfTNuEBDOUIRkIxAADCZGXUeOpGPedRWzSFJ0rOgyWhJUkn4+ZsXSZbFW0GPXjGlRgbt2YdSnIRUZMzHr4FiRzKVeBqNnzSMkKhiBqChkgIZCANiWCBzS5iANiN23EdQrlUR2oNnLkkWOr0XxKpO+7EdQrciigkcOTBX2ZhIzGzEnzKI4ZVe7HK6Ul11LBiJY3nYvMf6PjaFS9ouapy/JU9jyTaf+E0hGvgJq1Q06PpmpTJFXRr+ymcrFYSjWduKUEp91WPszX/smbeMVyPMap0bl4MOdIrVNmx9WKqRzR3Zr66src2UYulaBsKlP2lfkJi6d00IKPAe1GH9Xi6nSXtL6P6GJGXM630k5W4uFa2zcX4S2fmvmcXCZ6eKW0EYcsdZM6TJ+0dWlZN8cPuy5eD5HY5ZnVGv9mVpfdlo/h1PL1KzL4zJ5MEZDjkaPWiHA5b2lrUtJPjj0lv8JHU5bn1GtopcMvuy0fwezMc8MolozTNobPs7C9bwTNYzcdmF/WPwDAvyIMv6s6ewq6DTejBT2PTbMSQ1hkxSEzs+akxkxQokXGGTEMfMKvDC3N6fDmCVugbox8Xjm3aL0+veVUK3VmKwxdjSkkQbs2lwtlNKd0NCWgqEPcVkTAwGAx3zMlmLFjQiuME0RJrv8f3DRvqWWGBEOLYZIAPU/QvieKniKL92cKke71icX/8ANeZ6Uqdjx/0NYvhxlWD9+jf4wnG3+tnszRiz4/VdG3BO46lUZFikJYhntl6EqU7op9UXsW5w0mdo57tZlMa2Hqw5uDs+kt0/Ox4G7899n4rc+k8XFSVuv0PAu1mDVHGV4JWXFxxXRTV/rc3cVNRfwYuU1a+TVRkW4eV7lBfQlyNTMpeFSFuC5yM3WW9oa1Ky4uOP3Za+T5Hddgu1dOpXdKovVzlpDW6k+l+TPK7llDEShNSi7STUovo4u6Zx9OO21DcnVH0vPZi0noYOQZksTh6VZe/FNrpPaS80zLpM7Zwi4lxbkuKhnzaFCohA0Do1maVLyS6L5v8AiNmjSYqV5S8Wd412cZPBXcZalY0S5IvoOzsZF9fExI7mQ2AFtyMrbHQAS5j2LitgBTQlq18S5mMvtmUwAiGAgoAOn9GuI4MyodJ+sg/B05SX+aMT3pLofOfZSbjjcK1/56S+Dmk/k2fQ1ObTXf8A7j9uxdp9FsmCwYu/yA/55GeXHg2WjyZpCyXh5oqlUX/Gv0LXq7WBHkJcWA/uZlXBtp49Txr0sUorGRavrSs+l4ybsvDiPa3y7/2PMfTJQiqeHmklL1s1fucLv/THyNCSSpEG23bPLCymIx6QDLoMjYsAyEBGwReoZFdPfzAD2T0QY7jws6TetOo2vyzV/qpHbp6nlHocqtV68eTpJvxUlb6s9Uk9RMXuX3BcQDYDP//Z",
    "accuse_point" : 2,
    "accumulate_dew_point" : 100,
    "dew_point" : 100,
  }
  const stopCurPosition = ()=>{
    if(watchID !== null){
      navigator.geolocation.clearWatch(watchID);
      setWatchID(null);
    }
  };
  const startCurPosition = ()=>{
    if(navigator.geolocation){
      // timeout at 15000 milliseconds (15 seconds)
      const options = {timeout:15000};
      const geoLoc = navigator.geolocation;
      setWatchID(geoLoc.watchPosition((position)=>setCurPosition(position),(err)=>console.log(err), options));
   } else {
    setCurPosition(null);
   }
  };
  useEffect(()=>{
    axios({
      method:"get",
      url : `${process.env.PUBLIC_URL}/json/MatchedHelp.json`
    }).then(({data})=>{
      setHelp(data.data);
    }).catch(err=>console.log(err));
  },[]);

  const checkRoomId = useCallback(() => {
    axios({
      url: `/room/check/${helpPostId}`,
      method:"get"
    }).then(({data})=>{
      if(data === 2){
        alert("방이 꽉찼습니다");
        setMode("Infomation");
      }else{
        setMode("Chat");
      }
      });
  },[helpPostId]);

  return (
    <MatchedHelpWrap>
      <Header></Header>
      <Tap checkRoomId={checkRoomId} startCurPosition={startCurPosition} stopCurPosition={stopCurPosition} mode={mode} setMode={setMode}></Tap>
      <mainWrap>
        {
          mode === "Infomation" ? <Infomation help={help}/>:
          mode === "Chat" ? <Chat mode={mode} roomId={helpPostId} myProfile = {myProfile}/> :
          mode === "RealtimeMap" ? <RealtimeMap position={help.position}  curposition = {curposition}/>
          : null
        }
      </mainWrap>
      <Footer></Footer>
    </MatchedHelpWrap>
  )
}
const mainWrap = styled.div`
  width: 100%;
  height: calc(100% - 6rem);
`

const MatchedHelpWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export default MatchedHelp