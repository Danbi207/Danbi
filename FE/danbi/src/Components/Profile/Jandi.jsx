import React from "react";
import styled from 'styled-components'

const Jandi = () => {
    return (
        <JandiWrap>
            <JandiHeader>
                나의 도움을 기록해주세요
            </JandiHeader>
            <TableWrap>
                <JandiTableBefore>
                {[...Array(35)].map((_, Index) => (
                    <JandiTr key={Index} />))}
                </JandiTableBefore>
                <JandiTableNow>
                {[...Array(35)].map((_, Index) => (
                    <JandiTr key={Index} />))}
                </JandiTableNow>
            </TableWrap>
            <JandiFooter>
                밑에 짜잘한 정보
            </JandiFooter>
        </JandiWrap>
    )
}

const JandiWrap = styled.div`
    width: 100%;
    height: auto;
    margin-top: 1.5rem;
`
const JandiHeader = styled.div`
    font-size: 24px;
    height: 24px;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
`

const JandiTableBefore = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-template-columns: repeat(5, 1fr);
    border-collapse: collapse; 
    margin-left: 1rem;
    justify-items: center;
    row-gap: 3px;
`

const JandiTableNow = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-template-columns: repeat(5, 1fr);
    border-collapse: collapse;
    margin-right: 1rem;
    justify-items: center;
    row-gap: 3px;
`

const JandiTr = styled.td`
    display: flex;
    flex-direction: row;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
`

const TableWrap = styled.div`
    display: flex;
    height: 116px;
`

const JandiFooter = styled.div`
    margin-top:0.5rem;
    padding-left: 1rem;
    height: auto;
`

export default Jandi