import styled from 'styled-components';
import axios from 'axios';
// import { UseDispatch } from 'react-redux';
// import { useMutation } from '@tanstack/react-query';
import useInput from '../../hooks/useInput';

import ModalBody from './ModalBody';
import ModalBottom from './ModalBottom';
import InputItem from '../items/Input';
import { useState } from 'react';

const BtnSearch = styled.button`
    position: absolute;
    top: 1.3rem;
    right: 0;
    padding: 0.6rem 1.4rem;
    font-size: 1.2rem;
    color: #fff;
    background: #386aff;
    border-radius: 0.3rem;
`

function ModalInvite(){
    
    const [inviteMem, setInviteMem] = useInput('');

    // 멤버 검색
    const [memUserId,setMemUserId] = useState(0)
    const [memWorkName,setMemWorkName] = useState('')

    const searchMember = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(inviteMem === '') {
            alert('이메일을 입력하세요!')
            return
        }
        try {
            const res = await axios.get('/api/v1/user/search-email',{
                  params: {
                    email: inviteMem,
                },
            });
            if(res.data.status === 'success') {
                setMemUserId(res.data.inviteDTO.userId);
                setMemWorkName(res.data.inviteDTO.workspaceName);
            }
            console.log(res.data);
        }
        catch (err){
            console.log(err)
        }
    }

    // 멤버초대
    type formDataType = {
        email: string,
        workspaceId: number,
        title: string
    }
    const inviteMember = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formData : formDataType = {
            email: inviteMem,
            workspaceId: memUserId,
            title: memWorkName
        }
        if(inviteMem === '') {
            alert('이메일을 입력하세요!')
            return
        }
        try {
            const res = await axios.get('/api/v1/user/search-email', {
                params: formData
            });
            console.log(res)
        }
        catch (err){
            console.log(err)
        }
    }

    return (
        <>
            <ModalBody>
                <form>
                    <ul>
                        <li>
                            <InputItem inputTitle="이메일 검색" placeholder="이메일을 입력하여 검색해보세요." value={inviteMem} onChange={setInviteMem}></InputItem>
                            <BtnSearch onClick={searchMember}>Search</BtnSearch>
                        </li>
                    </ul>
                    <ModalBottom>
                        <button type="submit" className="btn-point" onClick={inviteMember}>invite +</button>
                    </ModalBottom>
                </form>
            </ModalBody>
        </>
    )
}

export default ModalInvite;