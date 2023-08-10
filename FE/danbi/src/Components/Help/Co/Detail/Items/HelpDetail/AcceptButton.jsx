import React, { useCallback } from 'react';
import styled from 'styled-components';
import { authPost } from '../../../../../../Util/apis/api';

const AcceptButton = ({ helpPostId }) => {
  const fetchData = useCallback(async () => {
    try {
      const data = authPost(`/api/v1/help/${helpPostId}`, {});
    } catch (err) {
      console.log(err);
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
