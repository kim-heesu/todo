import ReactDOM from 'react-dom';
import styled  from "styled-components";
import { X } from 'lucide-react';

type ModalProps = {
    children: React.ReactNode;
    modalState: boolean;
    ModalTitle: string;
    size : 'sm' | 'md' | 'lg'
    onClose : () => void;
}

const ModalWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
`;
const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 90vw;
    background: #fff;
    border-radius: 1.5rem;
    padding: 2.4rem;
    z-index: 10;
    overflow: hidden;
    transform: translate(-50%,-50%);
    .modal-tit {
        margin-bottom: 1rem;
        padding-right: 2rem;
        font-size: 2rem;
        font-weight: 600;
    }
    &.modal-sm {
        width: 43rem;
        height: 37rem;
    }
    &.modal-md {
        width: 55rem;
        height: 48rem;
    }
`;
const ModalContent = styled.div`
    position: relative;
    height: 100%;
    padding-bottom: 5rem;
`;

const BtnClose = styled.button`
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    width: 2rem;
    height: 2rem;
`;
const Overlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%; 
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    transform: translate(-50%,-50%);
    z-index: -1;
`;

function ModalCom(props: ModalProps) {
    if (!props.modalState) return null;

    return ReactDOM.createPortal(
        <ModalWrap>
            <Modal className={`modal-${props.size}`}>
                <h3 className='modal-tit'>{props.ModalTitle}</h3>
                <BtnClose onClick={props.onClose}> <X /></BtnClose>
                <ModalContent>
                    {props.children}
                </ModalContent>
            </Modal>
            <Overlay onClick={props.onClose}/>
        </ModalWrap>
        ,
        document.getElementById('modalRoot')!
    )
}

export default ModalCom;