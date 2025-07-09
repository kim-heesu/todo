import useMediaQuery from '../../hooks/useMediaQuery';
import useToggle from '../../hooks/useToggle';
import {NavLink } from 'react-router-dom';
import styled from 'styled-components';

import {BadgePlus} from 'lucide-react';
import Modal from '../modal/ModalWrap';
import ConHead from './ConHead';
import List from '../items/List';
import MemList from '../items/MemList';

type ContentProps = {
    title : string;
    btnTxt : string;
    titleSize?: string;
    modalTitle: string;
    modalSize : 'sm' | 'md' | 'lg';
    list?: {
        title: string;
        date: string;
        content: string;
    }[];
    AllMemList?: {
        profileSrc: string;
        name: string;
    }[];
    children: React.ReactNode;
}
const ContentItem = styled.div`
    width: 45%;
    padding: 3rem;
    background: ${({theme})=>theme.colors.bgGray};
    border-radius: 3rem;
    &:only-child {
        flex: 100%;
    }
    @media(max-width:${({theme})=>theme.breakpoints.tablet}) {
        position: fixed;
        top: 13rem ;
        right: 4rem;
        width: 46rem;
        max-width: 80vw;
        max-height: 70vh;
        overflow: auto;
        border: 1px solid #e2e2e2;
        box-shadow: ${({theme})=>theme.colors.leftShadow}
    }
`;
const MemWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem 1rem;
    margin: 2rem -1rem 0;
`;
const BtnIncid = styled.button`
    display: none;
    position: fixed;
    top: 8.5rem;
    right: 3.9rem;
    width: 2.4rem;
    height: 2.4rem;
    z-index: 9;
    @media(max-width:${({theme})=>theme.breakpoints.tablet}) {
        display:block
    }
`;

function ContentSm(props: ContentProps){
    const [modalOpen, handleModal] = useToggle();
    const media = useMediaQuery();
    const [incid, handleIncid] = useToggle();
    return (
        <>
            {media !== 'mediaPC' && (
                <BtnIncid onClick={handleIncid}><BadgePlus /></BtnIncid>
            )}

            {(media === 'mediaPC' || incid) && (
                <ContentItem>
                    <ConHead 
                    title={props.title} 
                    titleSize='sm'
                    btnTxt={props.btnTxt} 
                    onOpen={handleModal}
                    />
                    {props.list &&
                    props.list.map((item, idx) => {
                        return (
                        <NavLink to='/' key={idx}>
                            <List
                                list={item}
                                titleSize='sm'
                            />
                        </NavLink>
                        );
                    })}
                    {props.AllMemList && (
                        <MemWrap>
                            {props.AllMemList.map((item, idx) => (
                                <MemList
                                    key={idx}
                                    profileSrc={item.profileSrc}
                                    name={item.name}
                                />
                            ))}
                        </MemWrap>
                    )}

                </ContentItem>
            )}

            <Modal
            size={props.modalSize}
            ModalTitle={props.modalTitle}
            modalState={modalOpen}
            onClose={handleModal}
            >   
            {props.children}
            </Modal>
        </>
    )
}

export default ContentSm