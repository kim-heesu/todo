import React, { useState,useRef } from 'react';
import axios from 'axios';
import { useDispatch  } from 'react-redux';
import { editDTO } from '../../store/slices/userInfoSlice'
import { useNavigate } from 'react-router-dom';
import useVerifi from '../../hooks/useVerifi';
import MemForm from '../../components/member/MemForm'
import { ShieldUser,LockKeyhole,KeyRound } from 'lucide-react';

function LoginForm(){
    // 테스트계정
    // "email":"email@ema2il.c2o2m",
    // "password":"password"

    const LoginTxt=`Log in now to access your to-do list, stay organized,\n  and start checking off tasks to boost your daily productivity.`;

    const { MSG, setError, clearError } = useVerifi('');

    // 유효성 검사 메시지 영역
    const InstRef = useRef<HTMLElement>(null);

    // 로그인 인풋 ref
    const SignRefs = {
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
    };

    // 로그인 인풋리스트
    const LoginList = [
        {
            inputType:'text',
            inputId:'email',
            inputName:'email',
            inputPlace:'Email',
            icon:<ShieldUser />,
            ref: SignRefs.email
        },
        {
            inputType:'password',
            inputId:'password',
            inputName:'password',
            inputPlace:'Password',
            icon:<LockKeyhole />,
            ref: SignRefs.password
        },
    ]   

    // 입력값 상태
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    });

    // 인풋변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 로그인 유효성검사
    const validateLoginForm = (): boolean => {
        if(formData.email == ''){
            setError(SignRefs.email,InstRef, '이메일을 입력해주세요');
            return false;
        } else if (formData.password == '') {
            setError(SignRefs.password,InstRef, '패스워드를 입력해주세요');
            return false;
        } else {
            clearError()
            return true;
        }
    }
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    // 로그인요청
    const Login = async(e?: React.FormEvent) => {
        e?.preventDefault();
        if (!validateLoginForm()) return;

        try {
            const res = await axios.post('/api/v1/user/login',formData);

            if(res.data.status ==='success'){
                dispatch(editDTO({
                    email: res.data.todoUserDTO.email,
                    id: res.data.todoUserDTO.id,
                    password: res.data.todoUserDTO.password,
                    username: res.data.todoUserDTO.username
                }));
                navigate('/');
            } else {
                setError(SignRefs.email,InstRef, '이메일,패스워드를 확인해주세요.');
            }

            console.log('성공',res.data)
        } 
        catch (err){
            setError(SignRefs.email,InstRef, '이메일,패스워드를 확인해주세요.');
            console.error("에러 발생", err);
        }
    };
    
    return (
        <MemForm 
        headTitle="LOGIN" 
        headTxt={LoginTxt} 
        headIcon={<KeyRound />}
        formList={LoginList}
        onChange={handleChange}
        onSubmit={Login}
        instMSG={MSG}
        InstRef={InstRef}
        submitTxt="See my Tasks" 
        linkTxt="계정이 없으신가요? 지금 가입하세요" 
        memLink="/member/SignIn"/>
    )

}

export default LoginForm;