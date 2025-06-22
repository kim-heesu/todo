// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Gnb from './components/Gnb';
import TodayPage from './views/TodayPage';
import WorkSpace from './views/WorkSpace';

const Wrap = styled.div`
    position: relative;
    width: 1200px;
    max-width: 100%;
    min-width: 320px;
    margin:0 auto;
`;

function App() {
    return (
        <BrowserRouter>
        {/* <Header /> */}
        <Gnb />
        <Wrap>
            <Routes>
            <Route path="/" element={<TodayPage />} />
            <Route path="/workspace" element={<WorkSpace />} />
            </Routes>
        </Wrap>
        </BrowserRouter>
    );
}

export default App;