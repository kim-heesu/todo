// App.tsx
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';

import Gnb from './components/Gnb';
import TodayPage from './views/TodayPage';
import WorkSpace from './views/WorkSpace';
import Login from './views/member/Login';
import SignIn from './views/member/SignIn';
import MyPage from './views/MyPage';
import NotFound from './views/NotFound';

const Wrap = styled.div`
    position: relative;
    width: 1200px;
    max-width: 100%;
    min-width: 320px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 3rem 0;
    margin: 0 auto;
    @media (max-width:${({theme})=>theme.breakpoints.tablet}) {
         max-width: 90%;
    }
`;

function RouteWrap(){
    // 유저정보
    const userDTO = useSelector((state) => state.userDTO);
    const location = useLocation();
    const navigate = useNavigate(); 
    useEffect(()=>{
        if(!location.pathname.startsWith('/member') && userDTO.email == '') {
            alert('로그인정보가 없습니다.');
            navigate('/member/Login');
        } 
    },[location])

    return (
        <>  
            {!location.pathname.startsWith('/member') && 
                <Gnb name={userDTO.username}/>
            }
            <Wrap>
                <Routes>
                    <Route path="/" element={<TodayPage />} />
                    <Route path="/workspace/:workspaceId" element={<WorkSpace />} />
                    <Route path="/member/Login" element={<Login />} />
                    <Route path="/member/SignIn" element={<SignIn />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </Wrap>
        </>
    )
}
function App() {

    return (
        <BrowserRouter>
            <RouteWrap/>
        </BrowserRouter>
    );
}

export default App;