import styled from 'styled-components';

const Title = styled.h1`
    font-size: calc(0.25rem + 5vw);
    color: ${props => props.theme.colors.secondary};
    margin-bottom: calc(1rem + 1vw);
`;

export default Title;
