import React from 'react';
import styled from 'styled-components';
import PresetDetail from './PresetDetail';
import Edit from './MdEdit.svg';
import Delete from './MdDeleteForever.svg';

const PresetItem = ({value, index, OpenIndex, showDetail}) => {
    return(
        <>
            <Element key={index}>
                <PreSetElement className="el">
                    <ElementContent>
                        {value.content ? value.content : `프리셋 ${index + 1}`}
                    </ElementContent>
                    <Btns>
                        <EditBtn onClick={() => {showDetail(index);}}>
                            <EditImg src={Edit}/>
                        </EditBtn>
                        <DeleteBtn>
                            <DeleteImg src={Delete} />
                        </DeleteBtn>
                    </Btns>
                </PreSetElement>
            </Element>
            {OpenIndex === index && (
            <PresetDetail content={value.content} showDetail={showDetail} />
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
    justify-content: space-between; /* Change 'end' to 'space-between' */
    align-items: center;
    padding-right: 5px; /* Add padding-right */
`;

const EditBtn = styled.button`
    width: auto;
    height: auto;
    margin-right: 10px; /* Add margin-right */
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