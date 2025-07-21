import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import useInput from '../../hooks/useInput';

import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import InputItem from '../items/Input';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type TodoParams = {
    userId: number | string;
    description: string;
    todoDate: Date;
    workspaceId?: string;
}

type ModalScheduleProps = {
    workspaceId?: string;
    onAddTodo: (params: TodoParams) => void;
}

const Label = styled.label`
    display: block;
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 800;
`;

function ModalSchedule({ workspaceId, onAddTodo }: ModalScheduleProps) {
    const userInfo = useSelector((state: RootState) => state.userDTO);
    const [quillValue, setQuillValue] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [todoName, onTodoName] = useInput('');

    const params: TodoParams = {
        userId: userInfo.id,
        description: `${todoName}<hr><div class="quill-text">${quillValue}</div>`,
        todoDate: startDate,
        ...(workspaceId !== undefined && { workspaceId }),
    };

    const handleAddTodo = () => {
        onAddTodo(params);
    };

    return (
        <ModalBody>
            <form>
                <ul>
                    <li>
                        <InputItem
                            inputTitle="일정 이름"
                            txtType="add"
                            placeholder=""
                            id="scheName"
                            value={todoName}
                            onChange={onTodoName}
                        />
                    </li>
                    <li>
                        <Label htmlFor="scheDate">날짜</Label>
                        <DatePicker
                            id="scheDate"
                            className="custom-date"
                            selected={startDate}
                            onChange={(date: Date | null) => {
                                if (date) setStartDate(date);
                            }}
                        />
                    </li>
                    <li>
                        <Label>내용</Label>
                        <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue} />
                    </li>
                </ul>
                <ModalBottom>
                    <button type="button" className="btn-point" onClick={handleAddTodo}>
                        Add +
                    </button>
                </ModalBottom>
            </form>
        </ModalBody>
    );
}

export default ModalSchedule;
