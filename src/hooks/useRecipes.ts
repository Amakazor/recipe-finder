import { useContext, useEffect, useState } from 'react';
import EndpointContext from '../context/endpointContext';

const useRecipes = (ingredients: string[]): recipe[] => {
    const [recipes, setRecipes] = useState([]);
    const { endpoint } = useContext(EndpointContext);
    useEffect(() => {
        if (ingredients.length) {
            fetch(`${endpoint}${ingredients.join(',')}`)
                .then(response => response.json())
                .then(json => setRecipes(json));
        } else {
            setRecipes([]);
        }
    }, [ingredients]);
    return recipes;
};

export default useRecipes;
