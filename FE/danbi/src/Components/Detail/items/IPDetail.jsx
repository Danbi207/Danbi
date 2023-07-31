import React from 'react';
import styled from 'styled-components';

const IPDetail = ({helpPostId}) => {
    return(
        <IPDetailWrap>
            IP용 도움 상세보기
            {helpPostId}
        </IPDetailWrap>
    );
}

const IPDetailWrap = styled.div`
    
`


export default IPDetail