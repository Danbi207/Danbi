import React from 'react';
import styled from 'styled-components';


const DewPoint = ({point}) => {
    return(
        <DewPointWrap>
            <DewImg />
            {point}Dew
        </DewPointWrap>
    );
}

const DewPointWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
`

const DewImg = styled.img.attrs({
    src: `${props => props.theme.images.dew}`
})`
    width: 1rem;
    height: 1.3rem;
`

export default DewPoint