import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldUser,LockKeyhole,KeyRound,Mail } from 'lucide-react';

import MemForm from '../../components/member/MemForm';
import useVerifi from '../../hooks/useVerifi';

function SignInForm(){
    const SignInTxt=`Create your account now to start organizing 
    your tasks and boost your productivity every day.`;
    
    const { MSG, setError, setNormal, clearError } = useVerifi('');

    // 유효성 검사 메시지 영역
    const InstRef = useRef<HTMLInputElement>(null);

    // 회원가입 인풋 ref
    const SignRefs = {
        email: useRef<HTMLInputElement>(null),
        username: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
        passwordChk: useRef<HTMLInputElement>(null),
    };

    // 회원가입 인풋 리스트
    const SignInList = [
        {
            inputType:'text',
            inputId:'email',
            inputName:'email',
            inputPlace:'E-mail',
            icon:<Mail />,
            invite: true,
            ref: SignRefs.email
        },
        {
            inputType:'text',
            inputId:'username',
            inputName:'username',
            inputPlace:'Name',
            icon:<ShieldUser />,
            invite: false,
            ref: SignRefs.username
        },
        {
            inputType:'password',
            inputId:'password',
            inputName:'password',
            inputPlace:'Password',
            icon:<LockKeyhole />,
            invite: false,
            ref: SignRefs.password
        },
        {
            inputType:'password',
            inputId:'passwordChk',
            inputName:'passwordChk',
            inputPlace:'Check Password',
            icon:<LockKeyhole />,
            invite: false,
            ref: SignRefs.passwordChk
        }
    ];   

    // 입력값 상태
    const [formData, setFormData] = useState({
        email : '',
        emailInvite: '',
        password : '',
        passwordChk : '',
        username : '',
        profilePicture:'', 
    });

    // 인풋 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    // 이메일 중복 확인 여부
    const [mailInvite, setMailInvite] = useState(false);

    // 이메일 검증
    const MailInvite = async() => {
        if(formData.email === '') {
            setError(SignRefs.email, InstRef, '이메일을 입력해주세요');
            return;
        } 
        try {
            const res = await axios.get('/api/v1/user/verify-email',{
                  params: {
                    email: formData.email,
                },
            });
            setMailInvite(true);
            setNormal(InstRef,'사용할 수 있는 이메일입니다.');
            console.log('성공',res);
        }
        catch(err){
            setMailInvite(false);
            console.error("에러 발생", err);
        }
    };

    // 회원가입 유효성검사
    const validateSignupForm = (): boolean => {
        if(formData.email === ''){
            setError(SignRefs.email,InstRef, '이메일을 입력해주세요');
            return false;
        } else if (formData.username === '') {
            setError(SignRefs.username,InstRef, '이름을 입력해주세요');
            return false;
        } else if (formData.password === '') {
            setError(SignRefs.password,InstRef, '비밀번호를 입력해주세요');
            return false;
        } else if (formData.passwordChk === '') {
            setError(SignRefs.passwordChk,InstRef, '비밀번호를 확인해주세요');
            return false;
        } else if (formData.password !== formData.passwordChk) {
            setError(SignRefs.passwordChk,InstRef, '비밀번호가 다릅니다');
            return false;
        } else if (mailInvite === false) {
            setError(SignRefs.email,InstRef, '이메일 중복 여부를 확인해주세요');
            return false;
        } else {
            clearError(InstRef);
            return true;
        }
    };

    // 회원가입 요청
    const navigate = useNavigate(); 
    const SignUp = async(e?: React.FormEvent) => {
        e?.preventDefault();
        if (!validateSignupForm()) return;

        // passwordChk, emailInvite 제외한 payload 생성
        const { passwordChk, emailInvite, ...payload } = formData;

        // FormData로 변환
        const NFormData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if(value) NFormData.append(key, value as string);
        });

        try {
            const res = await axios.post('/api/v1/user/signup', NFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if(res.data.status === 'success'){
                alert('회원가입이 완료되었습니다. 환영합니다!');
                navigate('/member/Login');
            }
        } 
        catch (err){
            console.error("에러 발생", err);
        }
    };

    return (
        <MemForm 
            headTitle="Sign In" 
            headTxt={SignInTxt} 
            headIcon={<KeyRound />} 
            formList={SignInList}
            onChange={handleChange}
            onSubmit={SignUp}
            onInvite={MailInvite}
            instMSG={MSG}
            InstRef={InstRef}
            submitTxt="Get Started" 
            linkTxt="계정이 있으신가요? 로그인하러가기"
            memLink="/member/Login"
        />
    );
}

export default SignInForm;
