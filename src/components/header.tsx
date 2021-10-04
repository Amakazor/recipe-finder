import styled from 'styled-components';

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 100vh;

    background-image: ${props => props.theme.headerImage};
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';

        background: ${props => props.theme.colors.primary};
        opacity: 0.5;

        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
    }

    & > * {
        z-index: 1;
    }
`;

export default Header;
