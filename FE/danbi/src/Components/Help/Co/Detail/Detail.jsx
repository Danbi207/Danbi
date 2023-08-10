import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../Common/Header/Header';
import Footer from '../../../Common/Footer/Footer';
import styled from 'styled-components';
import HelperDetail from './Items/HelperDetail.jsx';

const Detail = () => {
  const { helpPostId } = useParams();
  const { role } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (role === 'ip') {
      navigate('/help/ip/request', { state: { helpPostId: helpPostId } });
    }
  }, [role, helpPostId, navigate]);
  return (
    <DetailWrap>
      <Header></Header>
      <HelperDetail helpPostId={helpPostId} />
      <Footer></Footer>
    </DetailWrap>
  );
};

const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export default Detail;
