import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Header from '../components/header';
import theme from '../themes/theme';

describe('Header', () => {
    const headerText = 'header text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Header>{headerText}</Header>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <Header>{headerText}</Header>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(headerText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        const { container } = render(
            <ThemeProvider theme={theme}>
                <Header>
                    <div>1</div>
                    <div>2</div>
                </Header>
            </ThemeProvider>,
        );
        const divs = container.children[0].getElementsByTagName('div');
        expect(divs.length).toBe(2);
    });
});
