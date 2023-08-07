import React from 'react'
import styled from 'styled-components';
import {setMode} from '../../../../store/Slice/ModalSlice';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useState } from 'react';
const Accuse = () => {
  const dispatch = useDispatch();
  const hiddenFileInputRef = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [content,setContent] = useState("");
  const [file,setFile] = useState(null);
  const encodeFileToBase64 = (fileBlob) => {
    //DO : 이미지를 Base64로 인코딩 -> 이미지 미리보기기능
    if(!fileBlob) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    setFile(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const submitAccuse = ()=>{
    //DO : 신고
    //FIXME : axios연결
    console.log(file,content);
  }

  return (
    <ModalWrap>
      <AccuseWrap>
        <CloseBtn onClick={()=>dispatch(setMode(false))}>X</CloseBtn>
        <TitleWrap>신고내용</TitleWrap>
        <ContentWrap onChange={(e)=>setContent(e.target.value)}></ContentWrap>
        <TitleWrap>신고내용</TitleWrap>
        <ImageWrap>
          {
            imageSrc ?
              <img width="100%" height="100%" alt='' src={imageSrc}/>
              :<div>이미지가 없습니다</div>
          }
        </ImageWrap>
        <input accept="image/*" ref={hiddenFileInputRef} onChange={(e)=>encodeFileToBase64(e.target.files[0])} style={{display:'none'}} type='file'></input>
        <UploadBtn onClick={()=>hiddenFileInputRef.current.click()}>업로드</UploadBtn>
        <AccuseBtn onClick={submitAccuse}>신고하기</AccuseBtn>
      </AccuseWrap>
    </ModalWrap>
  )
}
const AccuseBtn = styled.button`
  left: 0;
  bottom : 0;
  position: absolute;
  background-color: #E85151;
  height: 3rem;
  margin-left: 10%;
  width: 80%;
  @media screen and (max-width: 500px) {
    width: 80%;
  }
  border-radius: 0.5rem;
`
const UploadBtn = styled.button`
  margin-top: 0.5rem;
  margin-left: 10%;
  width: 5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  background-color: #6161FF;
`

const ImageWrap = styled.div`
  margin-left: 10%;
  width: 80%;
  height: 10rem;
  border: 1px solid ${props=>props.theme.colors.titleColor};
  border-radius: 0.5rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  
  &>img{
    object-fit: contain;
  }

  &>div{
    width : 100%;
    height: 100%;
    text-align: center;
    line-height: 10rem;
  }
`

const ContentWrap = styled.textarea`
  margin-left: 10%;
  width: 80%;
  height: 10rem;
  padding: 0.5rem;
  border: 1px solid ${props=>props.theme.colors.titleColor};
  border-radius: 0.5rem;
  background-color: ${props=>props.theme.colors.bgColor};
  color: ${props=>props.theme.colors.titleColor};
  resize: none;
`

const TitleWrap = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`
const AccuseWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
`
const ModalWrap = styled.div`
  position: fixed;
  z-index: 6;
  left: 25%;
  width: 50%;
  height: 80%;
  top: 10%;
  @media screen and (max-width: 500px) {
    width: 80%;
    left: 10%;
    height: 75%;
    top: 12.5%;
  }
  padding: 1rem;
  background-color: ${props=>props.theme.colors.bgColor};
`
export default Accuse