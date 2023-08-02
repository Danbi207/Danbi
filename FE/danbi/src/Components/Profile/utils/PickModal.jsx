import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Lottie from 'lottie-react';
import PickAnimation from '../data.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTier,
  setCheckedRgb,
  setUnchedkedRgb,
  setName,
  setDewPoint,
} from '../../../store/Slice/JandiSlice';

const PickModal = ({ setPickModalOpen }) => {
  const [ShowAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const CloseModal = () => {
    setPickModalOpen(false);
  };

  const dispatch = useDispatch();

  const handlePickModal = (pickdata) => {
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
      setPickModalOpen(true);
      dispatch(setName(pickdata.item.name));
      dispatch(setTier(pickdata.item.tier));
      dispatch(setUnchedkedRgb(pickdata.item.uncheckedRgb));
      dispatch(setCheckedRgb(pickdata.item.checkedRgb));
      dispatch(setDewPoint(pickdata.dew_point));
    }, 1500);
  };

  const pickdata = {
    item: {
      name: '보라',
      uncheckedRgb: '#c283d4',
      checkedRgb: '#a558b8',
      tier: 'Rare',
    },
    dew_point: 123456,
  };

  const cur_dew = useSelector((state) => state.Jandi.dew_point);
  const cur_UncheckedColor = useSelector((state) => state.Jandi.item.uncheckedRgb);
  const cur_CheckedColor = useSelector((state) => state.Jandi.item.checkedRgb);
  const cur_Name = useSelector((state) => state.Jandi.item.name);
  const cur_Tier = useSelector((state) => state.Jandi.item.tier);

  return (
    <PickModalWrap>
      {ShowAnimation ? (
        <AnimationWrap>
          <Lottie
            animationData={PickAnimation}
            style={{ width: '100%', height: '100%' }}
          />
        </AnimationWrap>
      ) : (
        <Wrap>
          <Header>
            <Title>사용결과</Title>
            <CloseBtn onClick={CloseModal}>X</CloseBtn>
          </Header>
          <ContentWrap>
            <Tier>{cur_Tier}</Tier>
            <Example>
              <Rec $color={(props) => props.theme.colors.titleColor} />
              <Rec $color={cur_UncheckedColor} />
              <Rec $color={cur_CheckedColor} />
            </Example>
            <Text>
              그래프 색상이 <ColorName>{cur_Name}</ColorName>(으)로 바뀌었어요!
            </Text>
          </ContentWrap>
          <Footer>
            <AcceptBtn
              onClick={() => {
                handlePickModal(pickdata);
              }}
            >
              한 번 더 사용하기
            </AcceptBtn>
            <Point>{cur_dew}Dew</Point>
          </Footer>
        </Wrap>
      )}
    </PickModalWrap>
  );
};

const fadeIn = keyframes`
    from {
        transform: scaleX(0);
        opacity: 0;
    }
    to {
        transform: scaleY(1);
        opacity: 1;
    }
`;

const PickModalWrap = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 21rem;
  height: 11.25rem;
  background-color: ${(props) => props.theme.colors.bgColor};
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  animation: ${fadeIn} 0.25s linear;
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin: 0.5rem 0;
`;

const AcceptBtn = styled.button`
  width: 5.5rem;
  height: 1.5rem;
  border-radius: 5px;
  background-color: #6161ff;
  margin-top: 0.25rem;
  font-size: 12px;
`;

const AnimationWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.bgColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
`;

const Title = styled.div``;

const CloseBtn = styled.button``;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Point = styled.div`
  font-size: 7px;
  margin-top: 0.25rem;
`;

const Tier = styled.div``;

const Example = styled.div`
  width: 6.75rem;
  display: flex;
  justify-content: space-between;
`;

const Rec = styled.div`
  background-color: ${(props) => props.$color};
  width: 1rem;
  height: 1rem;
  border-radius: 3px;
`;

const Text = styled.div``;

const ColorName = styled.span`
  font-weight: bold;
`;

export default PickModal;
