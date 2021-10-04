import { MutableRefObject, RefObject, useEffect, useState } from 'react';

export type clientSize = {
    clientWidth: number;
    clientHeight: number;
    scrollWidth: number;
    scrollHeight: number;
};

const useElementSize = (reference: MutableRefObject<HTMLElement> | RefObject<HTMLElement>, deps: React.DependencyList) => {
    const [clientSize, setClientSize] = useState({
        clientWidth: 0,
        clientHeight: 0,
        scrollWidth: 0,
        scrollHeight: 0,
    } as clientSize);

    const resizeListener = () => {
        if (reference.current) {
            setClientSize(Object.fromEntries(Object.entries(clientSize).map(([key]) => [key, (reference.current as any)[key]])) as clientSize);
        }
    };

    useEffect(() => {
        resizeListener();
    }, [...deps, reference.current]);

    useEffect(() => {
        window.addEventListener('resize', resizeListener);
        if (reference.current) {
            reference.current.addEventListener('resize', resizeListener);
        }

        return () => {
            window.removeEventListener('resize', resizeListener);
            if (reference.current) {
                reference.current.removeEventListener('resize', resizeListener);
            }
        };
    }, [reference.current]);

    return clientSize;
};

export default useElementSize;
