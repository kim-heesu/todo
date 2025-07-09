import styled from 'styled-components';
import MemHead from './MemHead'
import Meminput from '../items/MemInput';
import MemBtn from '../member/MemBtn';
import BgCircle from '../member/FloatingCircle'

type formProps = {
    headTitle: string;
    headTxt:string;
    formList: FormItem[],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInvite: () => void;
    onSubmit: () => void;
    submitTxt: string;
    linkTxt: string;
    memLink: string;
    headIcon?: React.ReactNode; 
    instMSG?: string;
    ref?: React.Ref<HTMLInputElement>;
    InstRef: React.RefObject<HTMLParagraphElement>;
}

const MemberBox = styled.div`
    position: relative;
    width: max-content;
    min-width: 500px;
    padding: 4rem 7rem 7rem 7rem;
    text-align: center;
    backdrop-filter: blur(10px);
    background: rgba(255,255,255,0.5);
    box-shadow: ${({theme})=>theme.colors.rightShadow};
    border-radius: 2rem;
    @media (max-width:${({theme})=>theme.breakpoints.tablet}) {
        min-width: auto;
    }
`;
const MemForm = styled.div`
    margin-top: 4rem;
`;
const ListItems = styled.li`
    position: relative;
    & + li {
        margin-top: 1.5rem;
    }
`
const MemberWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const InstMSG = styled.p`
    text-align: left;
    font-size: 1.2rem;
    font-weight: 600;
    &.error {
        color: #F30000;
    }
    &.normal {
        color: #002bff;
    }
`;
const BtnInvite = styled.button`
    position: absolute;
    top: 50%;
    right: 1.2rem;
    width: 7.8rem;
    height: 3rem;
    margin-top: -1.5rem;
    font-size: 1.2rem;
    color: #ff7800;
    border: 1px solid #FF9C12;
    border-radius: 0.5rem;
    &:hover {
        background: #ff7800;
        border-color: #ff7800;
        color: #fff;
    }
`;

function MemberForm(props:formProps){
    return (
        <MemberWrap>
            <BgCircle/>
            <MemberBox>
                <MemHead headTitle={props.headTitle} headTxt={props.headTxt} headIcon={props.headIcon}/>
                <MemForm>
                    <ul>
                        {props.formList.map((item)=>{
                            return (
                                <ListItems key={item.inputId}>
                                    <Meminput 
                                        type={item.inputType} 
                                        id={item.inputId}
                                        ref={item.ref}
                                        name={item.inputName} 
                                        placeholder={item.inputPlace} 
                                        icon={item.icon}
                                        onChange={props.onChange}
                                     ></Meminput>
                                     {item.invite && (
                                        <BtnInvite onClick={props.onInvite}>중복체크</BtnInvite>
                                     )}
                                </ListItems>
                            )
                        })}

                        {props.instMSG && (
                            <li>
                                <InstMSG ref={props.InstRef}>{props.instMSG}</InstMSG>
                            </li>
                        )}
                    </ul>

                    <MemBtn 
                        submitTxt={props.submitTxt} 
                        linkTxt={props.linkTxt} 
                        memLink={props.memLink}
                        onSubmit={props.onSubmit}
                    />
                </MemForm>
            </MemberBox>
        </MemberWrap>

    )
}

export default MemberForm;