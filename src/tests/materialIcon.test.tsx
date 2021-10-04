import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import MaterialIcon from '../components/materialIcon';
import theme from '../themes/theme';

describe('Material Icon', () => {
    const testText = 'home';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <MaterialIcon iconName={testText} />
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <MaterialIcon iconName={testText} />
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders as button correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <MaterialIcon iconName={testText} isButton />
            </ThemeProvider>,
        );
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('renders as text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <MaterialIcon iconName={testText} />
            </ThemeProvider>,
        );
        const buttons = screen.queryAllByRole('button');
        expect(buttons.length).toBe(0);
    });
});
