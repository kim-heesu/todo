import styled,{ keyframes } from 'styled-components';

const floatAround = keyframes`
    0%,100% {
        transform: translate(0,0);
    }
    25% {
        transform: translate(20vw, 10vh);
    }
    50% {
        transform: translate(30vw, 30vh);
    }
    75% {
        transform: translate(-15vw, 20vh);
    }
`;
const FloatingCircle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 70vw;
    height: 80vw;
    border-radius: 50%;
    background: radial-gradient(circle, #FFD438 30%, #fff);
    opacity: 0.7;
    animation: ${floatAround} 30s ease-in-out infinite;
    filter: blur(40px);
`;

function Circle(){
    return <FloatingCircle />
}

export default Circle;