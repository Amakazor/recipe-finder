import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Index from '../pages';
import theme from '../themes/theme';

describe('Index page', () => {
    it('renders without crashing', () => {
        render(
            <ThemeProvider theme={theme}>
                <Index />
            </ThemeProvider>,
        );
    });
});
