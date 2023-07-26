import React, { useState } from 'react';
import styled from 'styled-components'

const Uploader = () => {
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기 URL 배열
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 표시 중인 이미지의 인덱스

  const onChange = (e) => {
    const files = e.target.files; // 선택된 파일들의 목록
    const formData = new FormData(); // FormData 객체 생성

    // 선택된 모든 파일들을 FormData에 추가
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append(`img_${i}`, file);
    }

    // 이미지 파일 미리보기 생성
    const previewURLs = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        previewURLs.push(reader.result);
        if (previewURLs.length === files.length) {
          setImagePreviews(previewURLs);
        }
      };

      reader.readAsDataURL(file);
    }

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
    <div>
      <UploadWrap>  
        <PrevBtn onClick={prevImage}>{"<"}-</PrevBtn>
        <ImgDiv>
          <img
            src={imagePreviews[currentImageIndex]} alt=''
          />
        </ImgDiv>
        <NextBtn onClick={nextImage}>-{">"}</NextBtn>
      </UploadWrap>

      <SubmitInput type='file' accept='image/*' multiple name='profile_img' onChange={onChange} />
      
    </div>
  );
};
const SubmitInput = styled.input`
  @media screen and (max-width: 500px) {
    width: 20rem;
    margin-left: calc((100% - 20rem)/2);
  }
  width: 30rem;
  margin-left: calc((100% - 30rem)/2);
  margin-top: 1rem;
`

const PrevBtn = styled.button`
  position: absolute;
  font-size: 3rem;
  left: 1rem;
`

const NextBtn = styled.button`
  position: absolute;
  font-size: 3rem;
  right: 1rem;
`

const UploadWrap = styled.div `
  display: flex; 
  justify-content: center; 
  align-items: center;
  position: relative;
`

const ImgDiv = styled.div`
  border: 1px solid ${props=>props.theme.colors.titleColor};
  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 20rem;
  }
  width: 30rem;
  height: 30rem;
  & img{
    width: 100%;
    height: 100%;
  }
`

export default Uploader;
