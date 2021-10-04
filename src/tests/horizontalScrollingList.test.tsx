import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import HorizontalScrollingList from '../components/horizontalScrollingList';
import theme from '../themes/theme';

describe('Horizontal Scrolling List', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalScrollingList>{testText}</HorizontalScrollingList>
            </ThemeProvider>,
        );
    });

    it('renders text correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalScrollingList>{testText}</HorizontalScrollingList>
            </ThemeProvider>,
        );
        const text = screen.getByText(new RegExp(testText));
        expect(text).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalScrollingList>
                    <div>1</div>
                    <div>2</div>
                </HorizontalScrollingList>
            </ThemeProvider>,
        );
        const divs = screen.getAllByRole('listitem');
        expect(divs.length).toBe(2);
    });

    it('renders buttons correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalScrollingList buttonsAlways>
                    <div>1</div>
                    <div>2</div>
                </HorizontalScrollingList>
            </ThemeProvider>,
        );
        const expectedButtons = screen.getAllByRole('button');
        expect(expectedButtons.length).toBe(2);
    });

    it('render without buttons correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalScrollingList>
                    <div>1</div>
                    <div>2</div>
                </HorizontalScrollingList>
            </ThemeProvider>,
        );
        const unexpectedButtons = screen.queryAllByRole('button');
        expect(unexpectedButtons.length).toBe(0);
    });

    it('clicks buttons correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <HorizontalScrollingList buttonsAlways>
                    <div>1</div>
                    <div>2</div>
                </HorizontalScrollingList>
            </ThemeProvider>,
        );

        const buttons = screen.getAllByRole('button');

        buttons.forEach(button => {
            fireEvent.click(button);
        });
    });
});
