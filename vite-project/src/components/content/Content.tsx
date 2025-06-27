import ConHead from './ConHead';
import List from '../items/List';
import useToggle from '../../hooks/useToggle';
import styled from 'styled-components';
import Modal from '../modal/ModalWrap';

type ContentProps = {
    title : string;
    btnTxt : string;
    titleSize?:'sm'|'md';
    contentSize?: 'sm'|'md';
    modalTitle: string;
    modalSize : 'sm' | 'md' | 'lg';
    alarm?: number;
    list?: {
        title: string;
        date: string;
        content: string;
    };
    children: React.ReactNode;
}

const ContentItem = styled.div`
    width: 55%;
    padding: 2rem 0;
    &.sm {
        width: 45%;
        padding: 3rem;
        background: var(--bgGray);
        border-radius: 3rem;
    }
    &:only-child {
        flex: 100%;
    }
`;

function Content(props : ContentProps){
    const [modalOpen,handleModal] = useToggle();
    return (
        <>
            <ContentItem className={props.contentSize}>
                <ConHead title={props.title} titleSize={props.titleSize} alarm={props.alarm} btnTxt={props.btnTxt} onOpen={handleModal}></ConHead>
                {props.list && (
                    <ul>
                        <List list={props.list} titleSize={props.titleSize}/>
                    </ul>
                )}
                
            </ContentItem>

            <Modal size={props.modalSize} ModalTitle={props.modalTitle} modalState={modalOpen} onClose={handleModal}>
               {props.children}
            </Modal>
        </>
    )
}

export default Content;