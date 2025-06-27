import styled from 'styled-components';

const BodyStyle = styled.div`
    position: relative;
    height: calc(100% - 3rem);
    overflow: auto;
`;

type BodyProps = {
        children: React.ReactNode;
}

function ModalBody({children}:BodyProps){
    return (
        <BodyStyle>{children}</BodyStyle>
    )

}

export default ModalBody;