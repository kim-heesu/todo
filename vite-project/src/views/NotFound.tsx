import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BgCircle from '../components/member/FloatingCircle'

const NFound = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    z-index: 10;
    text-shadow: 0 0 1rem rgba(255,255,255,1);
    strong {
        font-size: 16rem;
        color: #222;
        text-shadow: 0 0 3rem rgba(255,255,255,1); 
    }
    p {
        margin-bottom: 2rem;
        font-size: 1.6rem;
        text-align: center;
        b {
            display: block;
            margin-bottom: 0.4rem;
            font-size: 1.5em;
        }
    }
    .btn-point {
        text-shadow: 0 0 3rem rgba(255,255,255,1); 
    }
`;

function NotFound(){
    const navigate = useNavigate(); 
    return (
        <>  
            <NFound>
                <strong>404</strong>
                <p><b>Oops!🙄</b> we can’t seem to find that page.<br />It may have been removed,<br />or you mighthave entered the wrong address.</p>
                <button type="button" className="btn-point" onClick={()=>{navigate('/')}}>Back to Main</button>
            </NFound>
            <BgCircle/>
        </>
    )
}

export default NotFound