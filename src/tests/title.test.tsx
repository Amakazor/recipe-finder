import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Title from '../components/title';
import theme from '../themes/theme';

describe('Title', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Title>{testText}</Title>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <Title>{testText}</Title>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });
});
