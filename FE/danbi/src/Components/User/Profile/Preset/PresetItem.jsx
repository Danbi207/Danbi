import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PresetDetail from './PresetDetail';
import { authDelete, authGet } from '../../../../Util/apis/api';

const PresetItem = ({
  value,
  index,
  OpenTitle,
  showDetail,
  setPresetList,
  OpenDetail,
}) => {
  const [EditActive, setEditActive] = useState(false);

  const callConfirm = useCallback(async () => {
    try {
      if (window.confirm('삭제하시겠습니까?')) {
        const deleteUrl = `/api/v1/preset/${value.id}`;
        await authDelete(deleteUrl, {});
        const res = await authGet('/api/v1/preset');
        setPresetList(res.presetList);
        alert('삭제되었습니다.');
      } else {
        alert('취소하였습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  }, [value.id, setPresetList]);

  return (
    <>
      <Element key={index}>
        <PreSetElement className="el">
          <ElementContent>
            {value.title ? value.title : `프리셋 ${index + 1}`}
          </ElementContent>
          <Btns>
            <EditBtn
              onClick={() => {
                showDetail(value.title);
                setEditActive(!EditActive);
              }}
              $EditActive={EditActive}
            >
              <EditImg />
            </EditBtn>
            <DeleteBtn onClick={callConfirm} $EditActive={EditActive}>
              <DeleteImg />
            </DeleteBtn>
          </Btns>
        </PreSetElement>
      </Element>
      {(OpenTitle === value.title) &&
          <PresetDetail
            sequence={value.sequence}
            content={value.content}
            PresetId={value.id}
            showDetail={showDetail}
            setEditActive={setEditActive}
            setPresetList={setPresetList}
          />
        }
    </>
  );
};

const Element = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid ${(props) => props.theme.colors.titleColor};
  border-radius: 5px;
  margin-bottom: 0.25rem;
`;

const PreSetElement = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
`;

const EditBtn = styled.button`
  width: auto;
  height: auto;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const EditImg = styled.img.attrs((props) => ({
  src: props.theme.images.edit_Big,
}))``;

const ElementContent = styled.div`
  flex: 1;
  text-align: start;
  padding-left: 5px;
`;

const DeleteBtn = styled.button`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.$EditActive ? 'hidden' : 'visible')};
`;

const DeleteImg = styled.img.attrs((props) => ({
  src: props.theme.images.delete_Big,
}))``;

const Btns = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
`;

export default PresetItem;
