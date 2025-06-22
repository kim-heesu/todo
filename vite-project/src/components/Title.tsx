import styled from 'styled-components';

type TitleProps = {
    title: string;
}

const Title = styled.h2`
    font-size: 4rem;
    font-weight: 800;
`

function TitleCom({title = 'PageTitle'}: TitleProps){
    return <Title>{title}</Title>
}

export default TitleCom;