import { useSelector, useDispatch } from 'react-redux';
import { Children, useState } from 'react';
import type { RootState } from '../../store/store';
import { setModalState } from '../../store/slices/modalToggleSlice';

import ConHead from './ConHead';
import List from '../items/List';
import styled from 'styled-components';
import Modal from '../modal/ModalWrap';
import Empty from './EmptyCon';

type ContentProps = {
    title : string;
    btnTxt : string;
    titleSize?:'sm'|'md';
    contentSize?: 'sm'|'md';
    modalTitle: string;
    modalReadTitle?: string;
    modalSize : 'sm' | 'md' | 'lg';
    alarm?: number;
    list?: {
        id: number;
        todoDate: string;
        title: string;
        content: string;
        description: string;
    }[];
    workMemlist?: {
        email:string;
        id:number;
        password:string;
        profilePicture:string;
        username:string;
    }[];

    onRead?: (id: number) => void;
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
    const modalToggle = useSelector((state:RootState) => state.modalToggle.modalState) as boolean;
    const modalDispatch = useDispatch();
    const [modalType, setModalType] = useState<'add'|'read'|null>(null);
    const [modalId, setModalId] = useState(0)
    const childrenArray = Children.toArray(props.children);
    return (
        <>
        <ContentItem className={props.contentSize}>
            <ConHead 
            title={props.title} 
            titleSize={props.titleSize} 
            alarm={props.alarm} 
            btnTxt={props.btnTxt} 
            onOpen={()=>{modalDispatch(setModalState(true)); setModalType('add')}} 
            />
            {Array.isArray(props.list) &&
            (props.list.length > 0 ? 
                props.list.map((item, idx) => {
                    const listComponent = (
                    <List
                        key={item.id}
                        id={item.id}
                        list={item}
                        titleSize={props.titleSize}
                        onOpen={() => {
                        modalDispatch(setModalState(true));
                        setModalType('read');
                        setModalId(item.id);
                        props.onRead?.(item.id);
                        }}
                    />
                    );

                    if (props.workMemlist) {
                    return (
                        <MemberCon key={idx}>
                            <MemInfo>
                                <div className="profile" style={{backgroundImage : `url(http://knou.pared.kr/uploads/${props.workMemlist[idx].profilePicture})`}} ></div>
                                <span className="name">{props.workMemlist[idx].username}</span>
                            </MemInfo>
                            {listComponent}
                        </MemberCon>
                    );
                    }

                    return <div key={idx}>{listComponent}</div>;
                })
            : <Empty />)}

        </ContentItem>
        {modalType === 'add' && (
            <Modal
            size={props.modalSize}
            ModalTitle={props.modalTitle}
            modalState={modalToggle}
            onClose={()=>{modalDispatch(setModalState(false))}}
            > 
                {childrenArray[0]}
            </Modal>
        )}
        {modalType === 'read' && (
            <Modal
            size={props.modalSize}
            ModalTitle={props.modalReadTitle}
            contentId={modalId}
            modalState={modalToggle}
            onClose={()=>{modalDispatch(setModalState(false))}}
            > 
                {childrenArray[1]}
            </Modal>
        )}
        </>
    );
}

export default Content;