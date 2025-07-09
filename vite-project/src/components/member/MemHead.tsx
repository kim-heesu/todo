import styled from 'styled-components';

type HeadProps = {
    headTitle :string;
    headTxt : string;
    headIcon?: React.ReactNode;
}
const MemberHead = styled.div``;

const HeadTitle = styled.h2`
    font-size: 4rem;
    font-weight: 800;
`;
const HeadTxt = styled.p`
    margin-top: 1rem;
    font-size: 1.4rem;
    color: #666;
    white-space: pre-wrap;
`;
const HeadIcon = styled.span`
    display: block;
    width: 6.4rem;
    height: 6.4rem;
    margin: 0 auto 2.8rem;
    padding: 0;
    line-height: 6.4rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: ${({theme})=>theme.colors.rightShadow};
    svg {
        width: 4.2rem;
        height: 4.2rem;
        margin-top: 1.1rem;
    }
`;
function MemHead({headTitle,headTxt,headIcon}:HeadProps){
    return (
        <MemberHead>
            {headIcon && <HeadIcon>{headIcon}</HeadIcon>}
            <HeadTitle>{headTitle}</HeadTitle>
            <HeadTxt>{headTxt}</HeadTxt>
        </MemberHead>
    )
}

export default MemHead;