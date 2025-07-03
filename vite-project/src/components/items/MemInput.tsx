import styled from 'styled-components';
import React, { forwardRef } from 'react';

type MemInputProps = {
    type: string;
    id: string;
    name: string;
    ref?: React.Ref<HTMLInputElement>;
    placeholder?: string;
    icon?: React.ReactNode; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox =styled.div`
    position: relative;
`;
const MemInput = styled.input`
    width: 100%;
    height: 5.2rem;
    padding: 1.2rem 9rem 1.2rem 5rem;
    font-size: 1.6rem;
    border: 1px solid #D9D9D9;
    background: #fff;
    border-radius: 0.4rem;
    &::placeholder {color:#797979;}
    &::-webkit-input-placeholder {color:#797979;}
    &:-ms-input-placeholder {color:#797979;}
    &.error {
        border-color: #F30000;
    }
`;
const InputIcon = styled.span`
    position: absolute;
    top: 50%;
    left: 1.5rem;
    width: 2.3rem;
    height: 2.3rem;
    margin-top: -1.15rem;
    opacity: 0.6;
`;

const MemberInput = forwardRef<HTMLInputElement, MemInputProps>((props:MemInputProps, ref) => {
    return (
        <InputBox>
            {props.icon && <InputIcon>{props.icon}</InputIcon>}
            <MemInput 
            type={props.type} 
            id={props.id} 
            ref={ref}
            name={props.name} 
            placeholder={props.placeholder}
            onChange={props.onChange}
            />
        </InputBox>
    )
});

export default MemberInput;