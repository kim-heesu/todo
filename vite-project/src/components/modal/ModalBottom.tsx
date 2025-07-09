import styled from 'styled-components';

const BottomStyle = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 2.4rem;
    gap: 0.4rem;
`;

type BottomProps = {
        children: React.ReactNode;
}

function ModalBottom({children}:BottomProps){
    return (
        <BottomStyle>{children}</BottomStyle>
    )

}

export default ModalBottom;