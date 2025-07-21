import styled from "styled-components";
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';

type ListProps = {
    id?: number,
    titleSize? : 'sm'|'md';
    onOpen?: () => void;
    list: {
        id: number;
        todoDate: string;
        title?: string;
        content?: string;
        description: string;
    };
}

const List = styled.div`
    min-width: 0;
    margin: 1.7rem 0;
    padding: 0.8em 1.2em;
    font-size: 2.2rem;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 1rem;
    cursor: pointer;
    &.sm {
        font-size: 1.7rem;
    }
`;
const ListHead = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4em;

`;
const ListTit = styled.strong`
    font-size: 1em;
    font-weight: 800
`;
const ListTime = styled.span`
    font-size : 0.7em;
    color: #4C4C4C;
`;
const ListContent = styled.div`
    .quill-text {
        width: 100%;
        font-size: 0.75em;
        color: #666;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
`;
function ListItem({list,titleSize,onOpen}:ListProps){
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    useEffect(()=>{
        if(list?.description?.includes('<hr>')){
            let [text1,text2] = list.description.split('<hr>')
            setTitle(text1)
            setContent(DOMPurify.sanitize(text2))
        }
    },[list])

 
    return (
        <List className={titleSize} onClick={onOpen}>
            <ListHead>
                <ListTit>{title}</ListTit>
                <ListTime>{list.todoDate}</ListTime>
            </ListHead>
            <ListContent dangerouslySetInnerHTML={{ __html: content }} />
        </List>
    )
}

export default ListItem;