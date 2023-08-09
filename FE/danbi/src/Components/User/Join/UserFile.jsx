import React, { useCallback, useState } from 'react'
import { useRef } from 'react';
import styled from 'styled-components'
import { authPost, reissueAccessToken, authFilePost } from '../../../Util/apis/api';
import { useNavigate } from 'react-router-dom';


const UserFile = ({ usertype, setUserType}) => {
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
      await authFilePost('/api/v1/submit/ip/certification', imageFiles);
      console.log(imageFiles)
      // DO : 로그아웃
      await authPost('/api/v1/member/logout', {}) 
      localStorage.removeItem('role');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshTokenExpireTime');
      navigate('/')
    } catch (error) {
        console.error("에러 발생:", error);
    }
  }, [imageFiles,navigate]);
  
  const onChange = (e) => {
    const files = [...e.target.files]; 
    setImageFiles(files); 

    // 선택된 모든 파일들을 FormData에 추가
    const formData = new FormData(); 
    files.forEach((file) => {
      formData.append('file', file);
    });

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
          { imagePreviews !== [] ? 
            <img src={imagePreviews[currentImageIndex]} alt=''/>
            : <div>이미지가 없습니다.</div> }
        </ImgDiv>
        <ImgNextBtn onClick={nextImage}>-{">"}</ImgNextBtn>
      </UploadWrap>
      <SubmitInput type='file' accept='image/*' multiple name='profile_img' onChange={onChange}
        ref={hiddenFileInputRef}  />
      {/* <UploadBtn onClick={()=>hiddenFileInputRef.current.click()}>업로드</UploadBtn> */}
      <NextBTN onClick={()=>{PutFileRole(); FileSubmit();}}>제출</NextBTN>
    </SubmitWrap>
  );
}

const SubmitWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props=>props.theme.colors.bgColor};
  color : ${props=>props.theme.colors.titleColor};
`
const Question = styled.div`
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  font-size: 1.5rem;
  text-align: center;
`

// const UploadBtn = styled.button`
//   margin-top: 0.5rem;
//   margin-left: 10%;
//   width: 5rem;
//   height: 1.5rem;
//   border-radius: 0.5rem;
//   background-color: #6161FF;
// `

const NextBTN  = styled.button`
  position: absolute;
  left : calc(( 100% - 30rem )/2);
  bottom: 1rem;
  width: 30rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: ${props => props.theme.colors.buttonbgColor};
  color: ${props => props.theme.colors.buttontextColor};
  font-size : 2rem;
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 3rem;
    left : calc(( 100% - 20rem )/2);
  }
`

const UploadWrap = styled.div `
  display: flex; 
  justify-content: center; 
  align-items: center;
  position: relative;
`

const ImgPrevBtn = styled.button`
  position: absolute;
  font-size: 3rem;
  left: 1rem;
`

const ImgDiv = styled.div`
  border: 1px solid ${props=>props.theme.colors.titleColor};
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 20rem;
  }
  width: 25rem;
  height: 25rem;
  & img{
    width: 100%;
    height: 100%;
  }
`

const ImgNextBtn = styled.button`
  position: absolute;
  font-size: 3rem;
  right: 1rem;
`

const SubmitInput = styled.input`
  @media screen and (max-width: 500px) {
    width: 20rem;
    margin-left: calc((100% - 20rem)/2);
  }
  width: 30rem;
  margin-left: calc((100% - 25rem)/2);
  margin-top: 1rem;
  /* display: none; */
`

export default UserFile;