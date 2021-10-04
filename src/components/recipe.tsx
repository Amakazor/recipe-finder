import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import HorizontalCenter from './horizontalCenter';
import MaterialIcon from './materialIcon';

export interface RecipeProps {
    recipeData: recipe;
    onTagClick: MouseEventHandler;
}

const Container = styled.article`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 0.065rem solid black;
    border-radius: 1rem;
    overflow: hidden;
`;

const InsideContainer = styled.div``;

const ImageContainer = styled.div`
    overflow: hidden;
    max-width: 100%;
    aspect-ratio: 1/1;
    background-image: url(./images/placeholder.png);
    background-size: cover;
`;

const Image = styled.img`
    display: block;
    object-fit: cover;
    height: 100%;
    width: 100%;
`;

const Name = styled.div`
    font-size: 1.05rem;
    font-weight: 600;
    padding: calc(0.5rem + 0.5vw);
`;

const TagsList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: calc(0.25rem + 0.25vw);
    list-style: none;
    margin-top: calc(0.5rem + 0.5vw);
    margin-bottom: calc(0.5rem + 0.5vw);
    padding: calc(0.5rem + 0.5vw);
`;

const Tag = styled.li`
    border: 0.065rem solid black;
    padding: 0.25rem;
    border-radius: 0.25rem;
    background: #f8f8f8;
    cursor: pointer;
    white-space: nowrap;
`;

const Link = styled.a`
    background: ${props => props.theme.colors.accent};
    background-image: linear-gradient(30deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    padding: 0.5rem;
    position: relative;
    z-index: 1;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    font-weight: 700;
    font-size: calc(0.5rem + 0.75vw);
    margin-bottom: calc(0.5rem + 0.5vw);

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

const Recipe = (props: RecipeProps) => {
    const {
        recipeData: { name, href, image, ingredients },
        onTagClick,
    } = props;
    return (
        <Container>
            <InsideContainer>
                <ImageContainer>
                    <Image src={image} alt={`Image for ${name}`} />
                </ImageContainer>

                <Name>{name}</Name>
                <TagsList>
                    {ingredients.map(ingredient => (
                        <Tag key={ingredient} data-tagname={ingredient} onClick={onTagClick} title="Click here to add this ingredient to search.">
                            {ingredient}
                        </Tag>
                    ))}
                </TagsList>
            </InsideContainer>
            <HorizontalCenter>
                <Link target="_blank" rel="external noopener" href={href} title={`Go to the original recipe of ${name}`}>
                    Go to the recipe <MaterialIcon iconName="arrow_forward" />
                </Link>
            </HorizontalCenter>
        </Container>
    );
};

export default Recipe;
