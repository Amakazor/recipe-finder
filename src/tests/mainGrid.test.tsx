/* eslint-disable react/no-array-index-key */
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import MainGrid from '../components/mainGrid';
import theme from '../themes/theme';

describe('Main grid', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <MainGrid>{testText}</MainGrid>
            </ThemeProvider>,
        );
    });

    it('renders children correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <MainGrid>
                    {new Array(50).fill(1).map((_, index) => (
                        <div key={index}>{testText}</div>
                    ))}
                </MainGrid>
            </ThemeProvider>,
        );
        const divs = screen.getAllByText(testText);
        expect(divs.length).toBe(50);
    });
});
