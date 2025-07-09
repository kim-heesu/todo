import styled from 'styled-components';
import Title from './Title.tsx';

type ConHeadProps = {
    title : string;
    btnTxt? : string;
    alarm?: number;
    titleSize?: 'sm'|'md'
    onOpen?: () => void;
}

const ContentHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    &.sm {
        font-size: 0.7rem;
    }
`;

function ConHead(props:ConHeadProps){
    return (
        <>
            <ContentHead className={props.titleSize}>
                <Title title={props.title} alarm={props.alarm}/>
                <button type="button" className="btn-point" onClick={props.onOpen}>{props.btnTxt}</button>
            </ContentHead>   
        </>

    )
}

export default ConHead;