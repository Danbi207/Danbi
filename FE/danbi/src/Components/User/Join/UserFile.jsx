import React, { useCallback, useState } from 'react'
import { useRef } from 'react';
import styled from 'styled-components'
import { authPost, reissueAccessToken, authFilePost } from '../../../Util/apis/api';
import { useNavigate } from 'react-router-dom';

const UserFile = () => {
  const hiddenFileInputRef = useRef();
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기 URL 배열
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 표시 중인 이미지의 인덱스
  const [imageFiles, setImageFiles] = useState([]); // 이미지 파일들을 저장하기 위한 state
  const navigate = useNavigate();

  const PutFileRole = useCallback(async () => {
    try {
      await authPost('/api/v1/member/role', {"role" : "ROLE_UNCERTIFICATED_IP"});
      await reissueAccessToken();
      localStorage.setItem('role', "ROLE_UNCERTIFICATED_IP");  
    } catch (error) {
        console.error("에러 발생:", error);
    }
  }, []);

  const FileSubmit = useCallback(async () => {
    try {
      // 이미지 파일 업로드 여부 확인
      if (imageFiles.length === 0) {
        alert("이미지 파일을 제출해주세요.")
        return;
      }
      const formData = new FormData(); 
      imageFiles.forEach((imgFile) => {
        formData.append('file', imgFile);
      });

      await authFilePost('/api/v1/submit/ip/certification', formData);
      // console.log(imageFiles)
      // DO : 로그아웃
      await authPost('/api/v1/member/logout', {}) 
      localStorage.removeItem('role');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshTokenExpireTime');
      navigate('/')
    } catch (error) {
        console.error("에러 발생:", error);
    }
  }, [imageFiles, navigate]);
  
  const onChange = (e) => {
    const files = [...e.target.files]; 
    setImageFiles(files); 

    // 이미지 파일 미리보기 생성
    const previewURLs = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewURLs.push(reader.result);
        if (previewURLs.length === files.length) {
          setImagePreviews(previewURLs);
        }
      };
      reader.readAsDataURL(file);
    });
    // 초기화: 첫 번째 이미지로 돌아가기
    setCurrentImageIndex(0);
  };

  // 다음 이미지로 이동하는 함수
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePreviews.length);
  };

  // 이전 이미지로 이동하는 함수
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagePreviews.length) % imagePreviews.length);
  };

  return (
    <SubmitWrap>
      <Question>서류를 제출해주세요</Question>
      <UploadWrap>  
        <ImgPrevBtn onClick={prevImage}>{"<"}-</ImgPrevBtn>
        <ImgDiv>
          { imagePreviews.length > 0 ? 
            <img src={imagePreviews[currentImageIndex]} alt=''/>
            : null }
        </ImgDiv>
        <ImgNextBtn onClick={nextImage}>-{">"}</ImgNextBtn>
      </UploadWrap>
      <SubmitInput type='file' accept='image/*' multiple name='profile_img' onChange={onChange}
        ref={hiddenFileInputRef}  />
      <NextBTN onClick={()=>{PutFileRole(); FileSubmit()}}>제출</NextBTN>
    </SubmitWrap>
  );
}

const SubmitWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props=>props.theme.colors.bgColor};
  color : ${props=>props.theme.colors.titleColor};
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const UploadWrap = styled.div `
  display: flex; 
  justify-content: center; 
  align-items: center;
  position: relative;
`

const Question = styled.div`
  font-size: 1.8rem;
  text-align: center;
  color : ${props=>props.theme.colors.titleColor};
  margin: 3rem 0;
  @media screen and (max-height : 680px) {
    margin: 2.5rem 0;
    padding-bottom: 1rem;
  }
`

const ImgPrevBtn = styled.button`
  position: absolute;
  font-size: 3rem;
  left: 0.2rem;
  color : ${props=>props.theme.colors.titleColor};
`

const ImgDiv = styled.div`
  border: 1px solid ${props=>props.theme.colors.titleColor};
  width: 25rem;
  height: 25rem;
  @media screen and (max-width: 680px) {
    width: 20rem;
    height: 20rem;
  }
  & img{
    width: 100%;
    height: 100%;
  }
`

const ImgNextBtn = styled.button`
  position: absolute;
  font-size: 3rem;
  right: 0.2rem;
  color : ${props=>props.theme.colors.titleColor};
`

const SubmitInput = styled.input`
  @media screen and (max-width: 680px) {
    width: 20rem;
    margin-left: calc((100% - 20rem)/2);
  }
  width: 30rem;
  margin-top: 1rem;
`

const NextBTN  = styled.button`
  position: absolute;
  bottom: 2rem;
  width: 92%;
  height: 3rem;
  left : calc(( 100% - 92% )/2);
  border-radius: 0.75rem;
  background-color: ${props => props.theme.colors.buttonbgColor};
  color: ${props => props.theme.colors.buttontextColor};
  font-size : 2rem;
  @media screen and (max-width: 680px) {
    
  }
`

export default UserFile;