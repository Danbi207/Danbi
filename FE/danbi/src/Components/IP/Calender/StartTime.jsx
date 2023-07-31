import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components'

import SDatePicker from "react-datepicker";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getHours, getMinutes } from 'date-fns';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { ko } from "date-fns/esm/locale";

const StartTime = ({reservetype}) => {
    // 시작 하는 날짜
    const [startDate, setStartDate] = useState(new Date());
    // 시작 시간
    const [startTime, setStartTime] = useState(null);
    // 종료 시간
    const [endTime, setEndTime] = useState(null);
    // 시작 시간을 선택했는지
    const [isSelected, setIsSelected] = useState(false);

    // 시작 시간이 선택되면 해당 시간 적용 및 isSelected를 true, endTime을 null로
    const onSelect = (time) => {
        setStartTime(time);
        setIsSelected(true);
        setEndTime(null);
    };

    // 시간 선택 관련 로직
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        // 즉시의 경우 현재 시간 기준 지나간 시간 선택 불가
        if (reservetype === 'now') {
            return currentDate.getTime() < selectedDate.getTime();
        }
        // 예약의 경우 월과 일이 같으면 지나간 시간 선택 불가(현재 작동x)
        if (reservetype === 'reserve' && selectedDate.getFullYear() === currentDate.getFullYear() && selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getDate() === currentDate.getDate()) {
            return currentDate.getTime() < selectedDate.getTime();
        }
        // 아닌 경우 전체 선택 가능
        return true;
    };

    useEffect(()=>{
        console.log(startDate);
    },[startDate])

    useEffect(()=>{
        console.log(startTime);
    },[startTime])

    useEffect(()=>{
        console.log(endTime);
    },[endTime])

    return (
        <>
            {/* <TimeWrap><DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                shouldCloseOnSelect={false}
            /></TimeWrap> */}

            <TimeWrap><SDatePicker
                selected={startTime}
                onChange={onSelect}
                locale={ ko }
                showTimeSelect
                // showTimeSelectOnly
                timeIntervals={15}
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 23)}
                timeCaption="시작 시간"
                dateFormat="MM월 dd일 aa h:mm 시작"
                placeholderText="시작 시간"
                className="mt-5"
                filterTime={filterPassedTime}
            /></TimeWrap>   

            {isSelected ? // 시작 시간을 선택해야 종료 시간 선택 가능
                <TimeWrap><SDatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                locale={ ko }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                minTime={startTime}
                maxTime={setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime)+2)} // 시작 시간부터 2시간
                excludeTimes={[
                    // 시작 시간 제외
                    startTime,
                ]}
                timeCaption="종료 시간"
                dateFormat="aa h:mm 종료"
                placeholderText="종료 시간"
                className="mt-3"
            /></TimeWrap>
                
                : null 
            }
        </>
    );
};

const TimeWrap = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
`

export default StartTime;