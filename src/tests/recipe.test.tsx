/* eslint-disable react/no-array-index-key */
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Recipe from '../components/recipe';
import theme from '../themes/theme';

describe('Recipe', () => {
    const recipeData = {
        id: 1,
        name: 'testName',
        image: 'https://cdn.pixabay.com/photo/2021/08/16/03/56/common-heron-6549208_960_720.jpg',
        href: 'https://pixabay.com/photos/common-heron-birds-egret-wings-6549208/',
        ingredients: ['bird', 'water', 'droplets'],
    } as recipe;

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Recipe recipeData={recipeData} onTagClick={() => {}} />
            </ThemeProvider>,
        );
    });

    it('renders all elements', () => {
        render(
            <ThemeProvider theme={theme}>
                <Recipe recipeData={recipeData} onTagClick={() => {}} />
            </ThemeProvider>,
        );

        expect(screen.getByText(recipeData.name)).toBeInTheDocument();

        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByRole('link').getAttribute('href')).toBe(recipeData.href);

        expect(screen.getAllByRole('listitem').length).toBe(recipeData.ingredients.length);

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('img').getAttribute('src')).toBe(recipeData.image);
        expect(screen.getByAltText(new RegExp(recipeData.name))).toBeInTheDocument();
    });
});
