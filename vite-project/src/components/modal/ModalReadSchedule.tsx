import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';

import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import InputItem from '../items/Input';
import styled from 'styled-components';

type readSchedule = {
    todoDetail?: {
        id: number;
        description: string;
        todoDate: string;
    };
}

const Label = styled.label`
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 800;
`;
const DetailContent = styled.div`
    font-size: 1.4rem;
    line-height: 1.4;
`;

function ModalSchedule(props:readSchedule){
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    useEffect(()=>{
    if(props.todoDetail?.description?.includes('<hr>')){
        let [text1,text2] = props.todoDetail.description.split('<hr>')
        setTitle(text1)
        setContent(DOMPurify.sanitize(text2))
    }
},[props.todoDetail])
    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <InputItem inputTitle="일정 이름" txtType="read" value={title}></InputItem>
                        </li>
                        <li>
                            <InputItem inputTitle="날짜" txtType="read" value={props.todoDetail?.todoDate || ''}></InputItem>
                        </li>
                        <li>
                            <Label>내용</Label>
                            <DetailContent dangerouslySetInnerHTML={{ __html: content }} />
                        </li>
                    </ul>
                    <ModalBottom>
                        <button type="button" className="btn-point red">Remove</button>
                    </ModalBottom>
                </form>
            </ModalBody>
        </>
    )
}

export default ModalSchedule;