import ReactDOM from 'react-dom';
import styled  from "styled-components";

type ModalProps = {
    children: React.ReactNode;
    size? : 'sm' | 'md' | 'lg'
    // onClose : () => void;
}

const Modal = styled.div<Modalprops>`
    position: absolute;
    top: 50%;
    left: 50%;
    width:  ${(props) =>
        props.size === 'sm' ? '30rem' :
        props.size === 'md' ? '40rem' :
        props.size === 'lg' ? '50rem' : 0
    };
    height:  ${(props) =>
        props.size === 'sm' ? '30rem' :
        props.size === 'md' ? '40rem' :
        props.size === 'lg' ? '50rem' : 0
    };
    background: #fff;
    border-radius: 1.5rem;
    padding: 2.4rem;
    z-index: 999;
`;
const Btnclose = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 2rem;
`;
const Overlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%; 
    background: rgba(0,0,0,0.4);
    transform: translate(-50%,-50%);
    z-index: -1;
`;

function ModalCom({children,size='sm'}: ModalProps) {
    return ReactDOM.createPortal(
        <Modal>
            <Btnclose />
            {children}
        </Modal>
        <Overlay/>
    )
}

export default ModalCom;