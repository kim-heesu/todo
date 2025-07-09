import styled from "styled-components";
import {Trash2} from 'lucide-react'

type MemItem = {
    profileSrc?: string;
    name: string;
}

const MemBox = styled.div`
    position: relative;
    padding: 0 2rem;
`;
const ImgBox = styled.div`
    width: 6.6rem;
    height: 6.6rem;
    border-radius: 50%;
    border: 1px solid #e2e2e2;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;
const MemName = styled.span`
    display: block;
    margin-top: 1rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
`;
const DeleteMem = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
`;
function MemList({profileSrc,name}:MemItem){
    return (
        <MemBox>
            <ImgBox style={{ backgroundImage: profileSrc ? `url(${profileSrc})` : 'none' }}/>
            <MemName>{name}</MemName>
            <DeleteMem><Trash2 /></DeleteMem>
        </MemBox>
    )
}

export default MemList