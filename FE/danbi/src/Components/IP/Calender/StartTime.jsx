import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'

import SDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getHours, getMinutes } from 'date-fns';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { ko } from "date-fns/esm/locale";


const StartTime = () => {
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

    // 현재 시간 기준 지나간 시간 선택 불가
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <>
            <TimeWrap><SDatePicker
                selected={startTime}
                onChange={onSelect}
                locale={ ko }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                timeCaption="Time"
                dateFormat="aa h:mm 시작"
                placeholderText="시작 시간"
                className="mt-4"
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
                timeCaption="Time"
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