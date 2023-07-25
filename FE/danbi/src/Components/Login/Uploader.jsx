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
      {/* 이미지 슬라이더 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <button onClick={prevImage}>P</button>
        <img
          src={imagePreviews[currentImageIndex]}
          alt={`Preview ${currentImageIndex}`}
          style={{ width: '300px', height: '300px', margin: '5px' }}
        />
        <button onClick={nextImage}>N</button>
      </div>

      <input type='file' accept='image/*' multiple name='profile_img' onChange={onChange} />
      
    </div>
  );
};

export default Uploader;
