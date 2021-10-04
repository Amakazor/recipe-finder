import { createContext } from 'react';

const EndpointContext = createContext<{ endpoint: string }>({ endpoint: '' });

export default EndpointContext;
