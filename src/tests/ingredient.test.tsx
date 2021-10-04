import { fireEvent, render, screen } from '@testing-library/react';
import { MouseEvent } from 'react';
import { ThemeProvider } from 'styled-components';
import Ingredient from '../components/ingredient';
import theme from '../themes/theme';

describe('Ingredient', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Ingredient name={testText} onRemove={() => {}} />
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <Ingredient name={testText} onRemove={() => {}} />
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('removes correctly', () => {
        let removeValue = '';

        const removeFunction = (event: MouseEvent<HTMLButtonElement>) => {
            removeValue = (event.target as HTMLButtonElement).dataset.ingredientname as string;
        };

        render(
            <ThemeProvider theme={theme}>
                <Ingredient name={testText} onRemove={removeFunction} />
            </ThemeProvider>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(removeValue).toBe(testText);
    });
});
