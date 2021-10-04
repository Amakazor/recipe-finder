import { ReactChild } from 'react';
import styled from 'styled-components';

interface MainGridProps {
    children: ReactChild | ReactChild[];
}

const Grid = styled.main`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 1fr;
    max-width: 100%;
    overflow: hidden;
    gap: calc(1rem + 2vw);
    margin: 2rem 2vw;
`;

const MainGrid = (props: MainGridProps) => {
    const { children } = props;
    return <Grid>{children}</Grid>;
};

export default MainGrid;
