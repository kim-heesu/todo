import { useState, useEffect, useRef } from "react";
import useInput from "../hooks/useInput";
import { useDispatch  } from 'react-redux';
import { editDTO, reset } from '../store/slices/userInfoSlice'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';
import InputItem from '../components/items/Input';
import styled from "styled-components";
import Title from "../components/content/Title";

const MyPageItem = styled.div`
    width: 70rem;
    max-width: 70vw;
`;
const PageHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width:${({theme})=>theme.breakpoints.tablet}) {
        display: block;
    }
`;
const HeadBtn = styled.div`
    display: flex; 
    align-items: center;
    gap: 0.4rem;
`;
const MyContent = styled.div`
    display: flex;
    gap: 3.6rem;
    align-items: center;
    padding: 3rem 0;
    @media (max-width:${({theme})=>theme.breakpoints.tablet}) {
        display: block;
    }
`;
const UploadWrap = styled.div`
    position: relative;
    width: 20rem;
    height: 20rem;
    margin: 0 auto;
    input {
        display: none;
    }
    label {
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-block;
        width: 6.4rem;
        height: 2.8rem;
        font-size: 1.3rem;
        text-align: center;
        line-height: 2.8rem;
        background: #fff;
        border: 1px solid #D9D9D9;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
            background: #d9d9d9;
        }
        svg {
            width: 1rem; 
            height: 1rem; 
            margin-right: 0.4rem;
        }
    }
    .img-result {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #D9D9D9;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url(../../src/assets/img/img_base_profile.png);
        background-color: #fff;
    }
    @media (max-width:${({theme})=>theme.breakpoints.tablet}) {
        margin: 2rem auto 3rem;
    }
`;
const MyList = styled.ul`
    flex: 1;
    li + li {
        margin-top: 2rem
    }
`;

function MyPage(){
    // 유저 정보
    const userDTO = useSelector((state)=> state.userDTO);

    // 이미지 업로드, 업로드한 이미지 미리보기
    const [preview, setPreview] = useState<string | null>(`http://knou.pared.kr/uploads/${userDTO.profilePicture}`);
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const imgResult = useRef<HTMLDivElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setPreviewFile(file);
        } else {
            setPreview(null);
            setPreviewFile(null);
        }
    };

    useEffect(() => {
        if (imgResult.current && preview) {
            imgResult.current.style.backgroundImage = `url(${preview})`;
        } else if (imgResult.current) {
            imgResult.current.style.backgroundImage = '';
        }
    }, [preview]);

    // 개인정보 이미지 뒷배경 랜덤
    useEffect(()=>{
        if(userDTO.profilePicture === '') {
            const colorList = ['#f6b3b3', '#f7caa1', '#f5e8a3', '#b9e3c6', '#8fcbdd', '#a1b6e9', '#c9a1e9'];
            let random = Math.floor(Math.random() * colorList.length);
            if((imgResult.current)){
                imgResult.current.style.backgroundColor = colorList[random];
            }
        }

    },[]);

    // 개인정보 수정, 수정된 정보로 userDTO 업데이트
    const [myPw, setMyPW] = useInput(userDTO.password);
    const [myName, setMyName] = useInput(userDTO.username);
    const dispatch = useDispatch();
    const modifyUser = async(e?: React.FormEvent)=> {
        e?.preventDefault();
        if (!myName || !myPw) {
            alert('빈값을 입력해주세요!');
            return;
        }
        const formData = new FormData();
        formData.append('targetUserId', userDTO.id);
        formData.append('username', myName);
        formData.append('password', myPw);
        if (previewFile) {
            formData.append('profilePicture', previewFile);
        }
        try {
            const res = await axios.post('/api/v1/user/modify-user', formData);
            console.log(res)
            if(res.statusText ==='OK'){
                dispatch(editDTO({
                    profilePicture: res.data.todoUserDTO.profilePicture,
                    password: res.data.todoUserDTO.password,
                    username: res.data.todoUserDTO.username
                }));

                console.log('변경후')
                console.log(userDTO)
            }
        } catch(err) {
            console.error(err);
        }
    };

    // 회원 탈퇴
    const navigate = useNavigate();
    const deleteUser = async(e: React.SyntheticEvent) => {
        if(confirm('탈퇴하시겠습니까?')) {
            try {
                const res = await axios.post(`/api/v1/user/delete-user/${userDTO.id}`);

                // 성공시 응답값 확인 후 if문 추가예정
                alert('탈퇴되었습니다.');
                navigate('/member/login');
                dispatch(reset());
            }
            catch(err) {
                console.log(err)
            }
        }
    }
    

    return (
        <>  
        <MyPageItem>
            <PageHead>
                <Title title="개인정보 수정" />
                <HeadBtn>
                    <button type="button" className="btn-point red" onClick={deleteUser}>회원탈퇴</button>
                    <button type="button" className="btn-point" onClick={modifyUser}>저장 +</button>
                </HeadBtn>
            </PageHead>
            <MyContent>
                <UploadWrap>
                    <input type="file" accept="image/*" id="imgFile" onChange={handleFileChange} />
                    <label htmlFor="imgFile"><Pencil />Edit</label>
                    <div ref={imgResult} className="img-result"></div>
                </UploadWrap>
                <MyList>
                    <li><InputItem inputTitle="이메일" id="myEmail" value={userDTO.email} txtType="read"/></li>
                    <li><InputItem inputType="password" inputTitle="패스워드" id="myPw" value={myPw} onChange={setMyPW}/></li>
                    <li><InputItem inputTitle="이름" id="myName" value={myName} onChange={setMyName}/></li>
                </MyList>
            </MyContent>
        </MyPageItem>
        </>
    )
}

export default MyPage;
