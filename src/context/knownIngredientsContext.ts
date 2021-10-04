import { createContext } from 'react';

const KnownIngredientsContext = createContext<{ knownIngredients: string[] }>({ knownIngredients: [''] });

export default KnownIngredientsContext;
