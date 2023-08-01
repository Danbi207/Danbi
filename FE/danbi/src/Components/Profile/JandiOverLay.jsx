import React from 'react';
import styled from 'styled-components';

const JandiOverLay = ({data}) => {
    return(
        <OverRayWrap>
            {data}
        </OverRayWrap>
    );
}

const OverRayWrap = styled.div`
    width: auto;
    height: auto;
    z-index: 3;
`

export default JandiOverLay