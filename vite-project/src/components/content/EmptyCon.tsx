import styled from 'styled-components';
import {SmilePlus} from 'lucide-react';

const EmptyCon = styled.div`
    width: 100%;
    padding: 4rem 0;
    margin-top: 1.5rem;
    text-align: center;
    border: 1px solid #e2e2e2;
    border-radius: 1rem;
    font-size: 1.4rem;
    color: #666;
    background: #fff;
    svg {
        display: block;
        width: 5.5rem;
        height: 5.5rem;
        margin: 0 auto 1.4rem;
        stroke-width: 1.5px;
        color: #9d9d9d;
    }
`;

function Empty(){
    return (
        <EmptyCon>
            <SmilePlus />
            Oops, looks like there’s nothing here just yet.<br />Get started by creating a new entry!
        </EmptyCon>
    );
}

export default Empty;