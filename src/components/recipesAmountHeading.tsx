import styled from 'styled-components';

const RecipesAmountHeading = styled.h2`
    font-size: calc(1rem + 2vw);
    color: ${props => props.theme.colors.primary};
    margin-bottom: calc(0.5rem + 0.5vw);
    margin-top: calc(0.5rem + 0.5vw);
    padding: 0 calc(0.5rem + 0.5vw);
`;

export default RecipesAmountHeading;
