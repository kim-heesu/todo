import { useDispatch  } from 'react-redux';
import { reset } from '../store/slices/userInfoSlice';
import { useNavigate } from 'react-router-dom';
import useToggle from '../hooks/useToggle';
import { AlignJustify , X, LogOut } from 'lucide-react';
import styled from 'styled-components';
import {NavLink } from 'react-router-dom';


type GnbProps= {
    name? : string;
}

const GnbWrap = styled.div`
    position: fixed;
    top: 0;
    right: 0; 
    padding: 4rem;
    z-index: 10;
    &.active {
        width: 45rem;
        min-height: 67rem;
        max-width: 100%;
        max-height: 100%;
        box-shadow: ${({theme})=>theme.colors.leftShadow};
        background: #fff;
    }
    h2 {
        padding-right: 2.5rem;
        font-size: 20px;
    }
    nav {
        margin-top: 3.2rem;
        li {
            a {
                position: relative;
                display: block;
                padding: 1.2rem 4rem 1.2rem 2rem;
                color: #666;
                font-size: 1.6rem;
                font-weight: 600;
                background: #F5F5F5;
                border-radius: 1rem;
                &::after {
                    content:'';
                    position: absolute;
                    top: 1.65rem;
                    right: 1.6rem;
                    width: 0.8rem;
                    height: 0.8rem;
                    border: solid #888;
                    border-width: 0 0.2rem 0.2rem 0;
                    transform: rotate(-45deg)
                }
                &.active,&:hover {
                    background: ${({theme})=>theme.colors.yellow};
                    color: #000;
                    font-weight: 800;
                    &::after {
                        border-color: #000
                    }
                }
            }
            & + li {
                margin-top: 1.6rem;
            }
        }
    }
`;

const BtnMenu = styled.button`
    position: absolute;
    top: 4rem;
    right: 4rem;
    width: 2.4rem;
    height: 2.4rem;
    svg {
        width: 100%;
        height: 100%;
    }
`;

const BtnLogout = styled.button`
    position: absolute;
    right: 4rem;
    bottom: 4rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;
    opacity: 0.7;
    svg {
        width: 1.8rem;
    }
    &:hover{
        opacity: 1;
    }
`;


function Gnb({name}:GnbProps) {
    const [menuOpen,handleMenu] = useToggle(false);
    
    //로그아웃
    const dispatch = useDispatch();

    const navigate = useNavigate(); 
    const LogOutFunc = async() =>{
        if(confirm('로그아웃하시겠습니까?')){
            alert('로그아웃 되었습니다.');
            dispatch(reset());
            navigate('/member/Login');
        } else {
            return;
        }

    }

    return (
        <>
        <GnbWrap className={menuOpen?'active':''}>
            <BtnMenu onClick={handleMenu}>
                {menuOpen ? <X /> : <AlignJustify />}
            </BtnMenu>
            {menuOpen && (
                <>
                    <h2><b>Welcome! </b>{name}</h2>
                    <nav>
                        <ul>
                            <li><NavLink to='/'>Today</NavLink></li>
                            <li><NavLink to='/MyPage'>My Page</NavLink></li>
                        </ul>
                    </nav>
                    <BtnLogout onClick={LogOutFunc}><LogOut /> Logout</BtnLogout>
                </>
            )}
            
        </GnbWrap>
        </>
    )
}

export default Gnb;