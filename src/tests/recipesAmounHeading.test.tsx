import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import RecipesAmountHeading from '../components/recipesAmountHeading';
import theme from '../themes/theme';

describe('Recipes amount heading', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <RecipesAmountHeading>{testText}</RecipesAmountHeading>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <RecipesAmountHeading>{testText}</RecipesAmountHeading>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });
});
