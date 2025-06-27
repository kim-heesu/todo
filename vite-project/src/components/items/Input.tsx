import styled from 'styled-components';

type InputProps= {
    inputTitle? :string;
    size?: 'sm'|'md'|'lg';
    value? : string;
    placeholder? :string;
    id? : string;
}
const InputItem = styled.input`
    width: 100%;
    height: 3.4rem;
    padding: 0.8rem 1.2rem;
    font-size: 1.4rem;
    border: 1px solid #D9D9D9;
    border-radius: 0.2em;

    &::placeholder {color:#797979;}
    &::-webkit-input-placeholder {color:#797979;}
    &:-ms-input-placeholder {color:#797979;}
`;
const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
    font-weight: 800;
`;

function Input(props:InputProps){
    return (
        <>
            {props.inputTitle &&
                <Label htmlFor={props.id}>{props.inputTitle}</Label>
            }
            <InputItem value={props.value} placeholder={props.placeholder} id={props.id} className={`input${props.size}`} />
        </>

    )
}

export default Input;