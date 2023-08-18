import React,{ useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { styled } from 'styled-components'
import {setMode} from "../../../../store/Slice/ModalSlice"
import { useEffect } from 'react'
import { authGet, authPost } from '../../../../Util/apis/api'
import { useCallback } from 'react'
const UCModal = () => {
  const user = useSelector(state=>state.admin.user);
  const dispatch = useDispatch();
  const [images,setImages] = useState([""]);
  const [imageIdx,setImageIdx] = useState(0);
  useEffect(()=>{
    if(user.id!==0){
      try{
        const data = authGet(`/api/v1/admin/ip/file/${user.id}`);
        if(data){
          setImages(data);
        }
      }catch(err){
        console.log(err);
      }
    }
  },[user.id]);

  const accept = useCallback(async()=>{
    if(user.id !==0){
      try{
        const data = authPost(`/api/v1/admin/ip/permit/${user.id}`);
        if(data){
          alert("승인되었습니다.")
        }
      }catch(err){
        console.log(err);
      }
    }
  },[user.id]);

  const reject = useCallback(async()=>{
    if(user.id !==0){
      try{
        const data = authPost(`/api/v1/admin/ip/reject/${user.id}`);
        if(data){
          alert("거절되었습니다.")
        }
      }catch(err){
        console.log(err);
      }
    }
  },[]);

  return (
    <Wrap>
      <button onClick={()=>{dispatch(setMode(null))}}>X</button>
      <div>{user.name}</div>
      <ImageWrap>
        <button onClick={()=>{
          if(imageIdx > 0){
            setImageIdx(imageIdx-1)
          }
        }}>{"<"}</button>
        <img alt='' src={images[imageIdx].url} />
        <button onClick={()=>{
          if(imageIdx < images.length-1){
            setImageIdx(imageIdx+1)
          }
        }}>{">"}</button>
      </ImageWrap>
      <ButtonWrap>
        <button onClick={accept}>승인</button>
        <button onClick={reject}>거절</button>
      </ButtonWrap>
    </Wrap>
  )
}
const ButtonWrap = styled.div`
  display: flex;
  gap: 1rem;
  & button{
    width: 3rem;
    background-color: #7373ff;
    color: #fff;
    height: 1.5rem;
    border-radius: 0.5rem;
  }
`
const ImageWrap = styled.div`
  display: flex;
  object-fit: cover;
  & img{
    margin: 0 auto;
    width: 30rem;
    height: 30rem;
  }
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  position: fixed;
  z-index: 6;
  width: 80%;
  left: 10%;
  height: 75%;
  top: 12.5%;
  padding: 1rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color:${props=>props.theme.colors.titleColor};
`

export default UCModal