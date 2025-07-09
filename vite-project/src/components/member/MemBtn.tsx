import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

type BtnProps = {
    submitTxt: string;
    linkTxt: string;
    memLink: string;

    onSubmit: () => void;
}

const BtnWrap = styled.div`
    margin-top: 5.5rem;
`;

const BtnSubmit = styled.button`
    width: 100%;
    height: 5.2rem;
    font-size: 2rem;
    font-weight: 800;
    background: ${({theme})=>theme.colors.yellow};
    &:hover {
        background: ${({theme})=>theme.colors.yellowHover};
    }
`;

const BtnLink = styled(NavLink)`
    position: relative;
    display: grid;
    grid-template-columns: 22% 1fr 22%;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #666;
    &::after {
        content: '';
        display: block;
        height: 1px;
        background: #666;
    }
    &::before {
        content: '';
        display: block;
        height: 1px;
        background: #666;
    }
    &:hover {
        color: #000;
    }
    @media (max-width:${({theme})=>theme.breakpoints.tablet}) {
        font-size: 1.2rem;
    }
`;

function MemBtn({submitTxt,linkTxt,memLink,onSubmit}:BtnProps){
    return(
        <BtnWrap>
            <BtnSubmit onClick={onSubmit}>{submitTxt}</BtnSubmit>
            <BtnLink to={memLink}>{linkTxt}</BtnLink>
        </BtnWrap>
    )
}

export default MemBtn;