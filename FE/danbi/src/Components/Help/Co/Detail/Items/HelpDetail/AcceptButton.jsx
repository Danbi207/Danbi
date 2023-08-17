import React, { useCallback } from 'react';
import styled from 'styled-components';
import { authPost } from '../../../../../../Util/apis/api';
import { useNavigate } from 'react-router';

const AcceptButton = ({ helpPostId }) => {
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    try {
      const data = await authPost(`/api/v1/help/${helpPostId}`, {});
      if(data){
        navigate(`/help/helper/matched/${helpPostId}`);
      }
    } catch (err) {
      if(err.response.data.errorCode==="H-004"){
        alert(err.response.data.errorMessage);
      }
    }
  });

  return <AcceptButtonWrap onClick={fetchData}>수락하기</AcceptButtonWrap>;
};

const AcceptButtonWrap = styled.button`
  font-size: 24px;
  background-color: #ffea7e;
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
`;

export default AcceptButton;
