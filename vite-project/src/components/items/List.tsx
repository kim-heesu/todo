import styled from "styled-components";

type ListProps = {
    titleSize? : 'sm'|'md'
    list: {
        title: string;
        date: string;
        content: string;
    };
}

const List = styled.li`
    margin: 1.7rem 0;
    padding: 0.8em 1.2em;
    font-size: 2.2rem;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 1rem;
    &.sm {
        font-size: 1.7rem;
    }
`;
const ListHead = styled.div`
    display: flex;
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
    font-weight: 800
    color: #4C4C4C;
`;
const ListContent = styled.p`
    width: 100%;
    font-size: 0.75em;
    color: #666;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;
function ListItem({list,titleSize}:ListProps){
    return (
        <List className={titleSize}>
            <ListHead>
                <ListTit>{list.title}</ListTit>
                <ListTime>{list.date}</ListTime>
            </ListHead>
            <ListContent>{list.content}</ListContent>
        </List>
    )
}

export default ListItem;