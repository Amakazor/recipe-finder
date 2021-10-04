import { Children, DetailedHTMLProps, HTMLAttributes, ReactChild, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useElementSize from '../hooks/useElementSize';

export interface HorizontalScrollingListProps {
    children: ReactChild | ReactChild[];
    buttonsAlways?: boolean;
}

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

interface ListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    isOverflown: boolean;
}

const List = styled.ul<ListProps>`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: hidden;
    max-width: ${props => (props.isOverflown ? 'calc(100% - ((1rem + 1vw) * 5))' : '100%')};
`;

const ScrollButton = styled.button`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
    color: ${props => props.theme.colors.secondary};
    font-size: calc(1rem + 1vw);
    height: 100%;
    aspect-ratio: 1/1;

    transition: background-color ${props => props.theme.transition} ease-in-out;
    cursor: pointer;

    &:first-child {
        left: 0;
    }

    &:last-child {
        right: 0;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.9);
    }
`;

const HorizontalScrollingList = (props: HorizontalScrollingListProps) => {
    const { children, buttonsAlways } = props;

    const ingredientsRef = useRef() as RefObject<HTMLUListElement>;
    const { clientWidth, scrollWidth } = useElementSize(ingredientsRef, [Children.count(children)]);
    const [overflow, setOverflow] = useState(false);
    useEffect(() => {
        if (overflow !== scrollWidth > clientWidth) {
            setOverflow(scrollWidth > clientWidth);
        }
    }, [clientWidth, scrollWidth]);

    const onMove = (value: number) => {
        if (ingredientsRef.current?.scrollBy) {
            ingredientsRef.current?.scrollBy({ left: 200 * value, behavior: 'smooth' });
        }
    };

    return (
        <Container>
            <List isOverflown={overflow || (buttonsAlways as boolean)} ref={ingredientsRef}>
                {(overflow || (buttonsAlways as boolean)) && (
                    <ScrollButton type="button" onClick={() => onMove(-1)}>
                        {'<'}
                    </ScrollButton>
                )}
                {Children.map(children, element => (
                    <li key={element.toLocaleString()}>{element}</li>
                ))}
                {(overflow || (buttonsAlways as boolean)) && (
                    <ScrollButton type="button" onClick={() => onMove(1)}>
                        {'>'}
                    </ScrollButton>
                )}
            </List>
        </Container>
    );
};

export default HorizontalScrollingList;
