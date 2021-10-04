import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler } from 'react';
import styled from 'styled-components';
import MaterialIcon from './materialIcon';

export interface ingredientProps {
    name: string;
    onRemove: MouseEventHandler;
}

const Container = styled.div`
    background: ${props => props.theme.colors.secondary};
    margin: calc(0.2vw + 0.2rem);
    padding: 0.5rem;
    border-radius: calc(0.1rem + 0.1vw);
    font-size: calc(0.75rem + 0.2vw);

    display: flex;
    flex-direction: row;
    align-items: center;

    white-space: nowrap;
`;

const Cross = styled(MaterialIcon)<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>`
    background: none;
    border: none;
    margin-left: 0.7vw;
    padding: 0.3rem;
    color: ${props => props.theme.colors.accent};
    font-weight: 700 !important;

    text-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: text-shadow ${props => props.theme.transition} ease-in-out;
    font-size: calc(0.5rem + 0.5vw);
    line-height: 0.9;

    &:hover {
        text-shadow: 0 0 2px rgba(0, 0, 0, 1);
    }
`;

const Ingredient = (props: ingredientProps) => {
    const { name, onRemove } = props;
    return (
        <Container>
            {name}
            <Cross isButton onClick={onRemove} title="Click here to remove ingredient!" data-ingredientname={name} iconName="close" />
        </Container>
    );
};

export default Ingredient;
