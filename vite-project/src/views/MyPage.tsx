import { useState, useEffect, useRef } from "react";
import { Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';
import InputItem from '../components/items/Input'
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
        background-color: #8fcbdd;
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
    // 유저정보
    const userDTO = useSelector((state)=> state.userDTO);

    const [preview, setPreview] = useState<string | null>(null);
    const imgResult = useRef<HTMLDivElement>(null)

    // 파일첨부 후 텍스트로 변환
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // base64 URL
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // 미리보기 이미지
    useEffect(() => {
        if (imgResult.current && preview) {
            imgResult.current.style.backgroundImage = `url(${preview})`;
        } else if (imgResult.current) {
            imgResult.current.style.backgroundImage = '';
        }
    }, [preview]);

    // 이미지 배경색 랜덤으로 넣기
    useEffect(()=>{
        const colorList = ['#f6b3b3', '#f7caa1', '#f5e8a3', '#b9e3c6', '#8fcbdd', '#a1b6e9', '#c9a1e9']
        let random = Math.floor(Math.random() * (colorList.length - 0 + 1) + 0);
        if((imgResult.current)){
            imgResult.current.style.backgroundColor = colorList[random]
        }
    },[])

    return (
        <>  
        <MyPageItem>
            <PageHead>
                <Title title="개인정보 수정" />
                <HeadBtn>
                    <button type="button" className="btn-point red">회원탈퇴</button>
                    <button type="button" className="btn-point">저장 +</button>
                </HeadBtn>
            </PageHead>
            
            <MyContent>
                <UploadWrap>
                    <input type="file" accept="image/*" id="imgFile" onChange={handleFileChange}/>
                    <label htmlFor="imgFile"><Pencil />Edit</label>
                    <div ref={imgResult} className="img-result"></div>
                </UploadWrap>
                <MyList>
                    <li><InputItem inputTitle="이메일" id="myEmail" value={userDTO.email} /></li>
                    <li><InputItem inputType="password" inputTitle="패스워드" id="myPw" value={userDTO.password}/></li>
                    <li><InputItem inputTitle="이름" id="myName" value={userDTO.username}/></li>
                </MyList>
            </MyContent>
        </MyPageItem>
            
        </>
    )
}

export default MyPage;