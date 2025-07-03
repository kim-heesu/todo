// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Gnb from './components/Gnb';
import TodayPage from './views/TodayPage';
import WorkSpace from './views/WorkSpace';
import Login from './views/member/Login';
import SignIn from './views/member/SignIn';

const Wrap = styled.div`
    position: relative;
    width: 1200px;
    max-width: 100%;
    min-width: 320px;
    min-height: 100vh;
    display: flex;
    gap: 30px;
    padding: 3rem;
    margin: 0 auto;
`;

function RouteWrap(){
    const location = useLocation();
    return (
        <>  
            {!location.pathname.startsWith('/member') && 
                <Gnb name="홍길동"/>
            }
            
            <Wrap>
                <Routes>
                    <Route path="/" element={<TodayPage />} />
                    <Route path="/workspace" element={<WorkSpace />} />
                    <Route path="/member/Login" element={<Login />} />
                    <Route path="/member/SignIn" element={<SignIn />} />
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