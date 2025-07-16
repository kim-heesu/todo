import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '@reduxjs/toolkit/query';
import useInput from '../../hooks/useInput';

import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import InputItem from '../items/Input';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type schedule = {
    workspaceId?: string;
    onAddTodo: (params: TodoParams) => void;
}
const Label = styled.label`
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 800;
`;

function ModalSchedule({workspaceId,onAddTodo}:schedule){
    const userInfo = useSelector((state:RootState) => state.userDTO);
    const [quillValue, setQuillValue] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [todoName, onTodoName] = useInput('');

    type TodoParams = {
        userId: number;
        description: string;
        todoDate: Date;
        workspaceId?: string;
    };
    const params:TodoParams = {
        userId: userInfo.id,
        description: `${todoName}<hr><div class="quill-text">${quillValue}</div>`,
        todoDate: startDate,
        ...(workspaceId !== undefined && {workspaceId})
    }

    const handleAddTodo = () => {
        onAddTodo(params);
    };
    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <InputItem inputTitle="일정 이름" txtType="add" placeholder="" id="scheName" value={todoName} onChange={onTodoName}></InputItem>
                        </li>
                        <li>
                            <Label htmlFor="scheDate">날짜</Label>
                            <DatePicker id="scheDate" className="custom-date" selected={startDate} value={startDate} onChange={(date) => setStartDate(date)} />
                        </li>
                        <li>
                            <Label>내용</Label>
                            <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue}/>
                        </li>
                    </ul>
                    <ModalBottom>
                        <button type="button" className="btn-point" onClick={handleAddTodo}>Add +</button>
                    </ModalBottom>
                </form>
            </ModalBody>
        </>
    )
}

export default ModalSchedule;