import React, { useState } from 'react';
import styled from 'styled-components';
import PresetDetail from './PresetDetail';
import Edit from './MdEdit.svg';
import Delete from './MdDeleteForever.svg';

const PresetItem = ({value, index, OpenTitle, showDetail}) => {
    const [EditActive, setEditActive] = useState(false);
    const [DeleteActive, setDeleteActive] = useState(false);

    const callConfirm = () => {
        if(window.confirm('삭제함?')){
            alert('삭제됨');
        } else {
            alert('취소함');
        }
    }
    return(
        <>
            <Element key={index}>
                <PreSetElement className="el">
                    <ElementContent>
                        {value.content ? value.content : `프리셋 ${index + 1}`}
                    </ElementContent>
                    <Btns>
                        <EditBtn onClick={() => {showDetail(value.title); setEditActive(!EditActive)}} $EditActive={EditActive} $DeleteActive={DeleteActive} >
                            <EditImg src={Edit}/>
                        </EditBtn>
                        <DeleteBtn onClick={() => {setDeleteActive(!DeleteActive); callConfirm()}} $DeleteActive={DeleteActive} $EditActive={EditActive}>
                            <DeleteImg src={Delete} />
                        </DeleteBtn>
                    </Btns>
                </PreSetElement>
            </Element>
            {OpenTitle === value.title && (
            <PresetDetail content={value.content} showDetail={showDetail} setDeleteActive={setDeleteActive} setEditActive={setEditActive} />
            )}
        </>
    );
}

const Element = styled.div`
    width: 100%;
    height: 2rem;
    border: 1px solid white;
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

const EditImg = styled.img`
`;

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
    visibility: ${props => props.$EditActive ? 'hidden' : 'visible'};
`;

const DeleteImg = styled.img`
`;

const Btns = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1rem;
`;

export default PresetItem;