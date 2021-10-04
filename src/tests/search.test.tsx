import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import { ThemeProvider } from 'styled-components';
import Search from '../components/search';
import theme from '../themes/theme';

describe('Seacrch', () => {
    const testText = 'text';

    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Search onChange={() => {}} onKeyPress={() => {}} onSubmit={() => {}} value="" firstUse />
            </ThemeProvider>,
        );
    });

    it('contains all needed elements', () => {
        render(
            <ThemeProvider theme={theme}>
                <Search onChange={() => {}} onKeyPress={() => {}} onSubmit={() => {}} value="" firstUse />
            </ThemeProvider>,
        );

        expect(screen.getByRole('searchbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has valid value', () => {
        render(
            <ThemeProvider theme={theme}>
                <Search onChange={() => {}} onKeyPress={() => {}} onSubmit={() => {}} value={testText} firstUse />
            </ThemeProvider>,
        );

        expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe(testText);
    });

    it('submits', () => {
        let submits = 0;

        const submit = () => {
            submits += 1;
        };

        render(
            <ThemeProvider theme={theme}>
                <Search onChange={() => {}} onKeyPress={submit} onSubmit={submit} value={testText} firstUse />
            </ThemeProvider>,
        );

        const button = screen.getByRole('button') as HTMLButtonElement;
        const input = screen.getByRole('searchbox') as HTMLInputElement;

        fireEvent.click(button);
        fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

        expect(submits).toBe(2);
    });

    it('changes', () => {
        const changes: string[] = [];

        const change = (event: ChangeEvent) => {
            changes.push((event.target as HTMLInputElement).value);
        };

        render(
            <ThemeProvider theme={theme}>
                <Search onChange={change} onKeyPress={() => {}} onSubmit={() => {}} value="" firstUse />
            </ThemeProvider>,
        );

        const input = screen.getByRole('searchbox') as HTMLInputElement;
        userEvent.type(input, 'abcd');

        expect(changes).toStrictEqual(['a', 'b', 'c', 'd']);
    });

    it('renders different placeholder depending ot if it is first use of the search bar', () => {
        render(
            <ThemeProvider theme={theme}>
                <Search onChange={() => {}} onKeyPress={() => {}} onSubmit={() => {}} value="" firstUse />
            </ThemeProvider>,
        );
        const placeholderFirstUse = (screen.getByRole('searchbox') as HTMLInputElement).placeholder;

        cleanup();
        render(
            <ThemeProvider theme={theme}>
                <Search onChange={() => {}} onKeyPress={() => {}} onSubmit={() => {}} value="" firstUse={false} />
            </ThemeProvider>,
        );
        const placeholderNotFirstUse = (screen.getByRole('searchbox') as HTMLInputElement).placeholder;

        expect(placeholderFirstUse).not.toBe(placeholderNotFirstUse);
    });
});
