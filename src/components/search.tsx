import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useContext } from 'react';
import styled from 'styled-components';
import KnownIngredientsContext from '../context/knownIngredientsContext';
import MaterialIcon from './materialIcon';

export interface searchProps {
    onChange: ChangeEventHandler;
    onKeyPress: KeyboardEventHandler;
    onSubmit: MouseEventHandler;
    value: string;
    firstUse: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: calc(10rem + 40vw);
    border-radius: calc(0.1rem + 0.1vw);
    overflow: hidden;
    min-width: 300px;
    margin-bottom: 1rem;
`;

const Submit = styled.button`
    background: ${props => props.theme.colors.accent};
    background-image: linear-gradient(30deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    color: ${props => props.theme.colors.secondary};
    border: none;
    aspect-ratio: 1/1;
    width: 6%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(1rem + 1vw);
    position: relative;
    z-index: 1;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
    min-width: 2rem;

    transition: text-shadow ${props => props.theme.transition} ease-in-out;

    &:hover {
        &::before {
            opacity: 1;
        }
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        content: '';
        background-image: linear-gradient(30deg, ${props => props.theme.colors.accentSecondary}, ${props => props.theme.colors.accent});
        opacity: 0;
        z-index: -1;

        transition: opacity ${props => props.theme.transition} ease-in-out;
    }
`;

const SearchBar = styled.input`
    border: none;
    flex-grow: 40;
    outline-offset: -2px;
    padding: 0.5rem calc(0.25rem + 0.5vw);
    font-size: calc(0.5rem + 0.75vw);
`;

const Search = (props: searchProps) => {
    const { knownIngredients } = useContext(KnownIngredientsContext);
    const { onChange, onKeyPress, onSubmit, value, firstUse } = props;

    return (
        <Container>
            <SearchBar
                onChange={onChange}
                onKeyPress={onKeyPress}
                value={value}
                type="text"
                list="ingredientsList"
                placeholder={firstUse ? 'Enter the name of an ingredient here' : 'Nice! Enter next ingredients!'}
                title="Search for ingredient in recipes"
                role="searchbox"
            />
            <datalist id="ingredientsList">
                {knownIngredients.map(ingredient => (
                    <option key={ingredient}>{ingredient}</option>
                ))}
            </datalist>
            <Submit type="submit" onClick={onSubmit}>
                <MaterialIcon iconName="search" />
            </Submit>
        </Container>
    );
};

export default Search;
