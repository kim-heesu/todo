import ConHead from './ConHead';
import List from '../items/List';
import useToggle from '../../hooks/useToggle';
import styled from 'styled-components';
import Modal from '../modal/ModalWrap';
import { Children, useState } from 'react';

type ContentProps = {
    title : string;
    btnTxt : string;
    titleSize?:'sm'|'md';
    contentSize?: 'sm'|'md';
    modalTitle: string;
    modalSize : 'sm' | 'md' | 'lg';
    alarm?: number;
    list?: {
        id: number;
        description: string;
        todoDate: string;
    }[];
    workMemlist?: {
        profileSrc: string;
        name: string;
    }[];
    children: React.ReactNode;
}

const ContentItem = styled.div`
    width: 55%;
    padding: 2rem 4rem 2rem 0;
    &:only-child {
        flex: 100%;
    }
    @media(max-width:${({theme})=>theme.breakpoints.tablet}) {
        width: 100%;
    }
`;
const MemberCon = styled.div`
    display: grid;
    grid-template-columns: 6.6rem 1fr;
    gap: 1.4rem;
    align-items: center;
`;
const MemInfo = styled.div`
    .profile {
        display: block;
        width: 6.6rem;
        height: 6.6rem;
        border: 1px solid #e2e2e2;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .name {
        display: block;
        margin-top: 1rem;
        font-size: 1.6rem;
        font-weight: 600;
        text-align: center;
    }
`;
function Content(props: ContentProps) {
    const [modalOpen, handleModal] = useToggle();
    const [modalType, setModalType] = useState<'add'|'read'|null>(null);
    const childrenArray = Children.toArray(props.children);
    return (
        <>
        <ContentItem className={props.contentSize}>
            <ConHead 
            title={props.title} 
            titleSize={props.titleSize} 
            alarm={props.alarm} 
            btnTxt={props.btnTxt} 
            onOpen={()=>{handleModal(); setModalType('add')}} 
            />
            {Array.isArray(props.list) &&
            props.list.map((item, idx) => {
                const listComponent = (
                <List
                    key={item.id}
                    id={item.id}
                    list={item}
                    titleSize={props.titleSize}
                    onOpen={() => {
                    handleModal();
                    setModalType('read');
                    }}
                />
                );

                if (props.workMemlist) {
                return (
                    <MemberCon key={idx}>
                        <MemInfo>
                            <div className="profile" style={{backgroundColor : `url(${props.workMemlist[idx].profileSrc})`}} ></div>
                            <span className="name">{props.workMemlist[idx].name}</span>
                        </MemInfo>
                        {listComponent}
                    </MemberCon>
                );
                }

                return <div key={idx}>{listComponent}</div>;
            })}

        </ContentItem>
        <Modal
        size={props.modalSize}
        ModalTitle={props.modalTitle}
        modalState={modalOpen}
        onClose={handleModal}
        >   
            {modalType === 'add' && childrenArray[0]}
            {modalType === 'read' && childrenArray[1]}
        </Modal>
        </>
    );
}

export default Content;