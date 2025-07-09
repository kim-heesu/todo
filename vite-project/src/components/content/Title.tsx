import React, { useEffect, useState } from 'react';
import styled  from "styled-components";
import { Bell } from 'lucide-react';

type TitleProps = {
    title?: string;
    alarm?: number;
}

const TitleWrap = styled.div`
    display: flex;
    margin-bottom: 0.57em;
`;
const Title = styled.h2`
    font-size: 4em;
    font-weight: 800;
`
const BellWrap = styled.div`
    position: relative;
    margin-left: 1rem;
    svg {
        width: 4rem;
        height: 4rem;
    }
`;
const Alarm = styled.span`
    position: absolute;
    top: -1rem;
    left: 2.6rem;
    width: max-content;
    padding: 0.2rem 0.7rem 0.1rem;
    font-size: 1.4rem;
    font-weight: 800;
    background: ${({theme})=>theme.colors.yellow};
    border-radius: 10em;
    &:hover {
        background: ${({theme})=>theme.colors.yellowHover};
    }
`;

function TitleCom({title,alarm}: TitleProps){
    const [alarmNum,setAlarmNum] = useState(alarm)
    useEffect(()=>{
        setAlarmNum(alarm > 99 ? 99 : alarm)
    },[alarm])
    return (
        <TitleWrap>
            <Title>{title}</Title>
             {alarm && (
                <BellWrap>
                    <Alarm>{alarmNum} {alarm > 99 ? '+': ''}</Alarm>
                    <Bell />
                </BellWrap>
             )}
        </TitleWrap>
    )
}

export default TitleCom;