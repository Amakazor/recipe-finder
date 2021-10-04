import { renderHook } from '@testing-library/react-hooks';
import { createServer, Registry, Server } from 'miragejs';
// eslint-disable-next-line import/no-unresolved
import { AnyFactories, AnyModels } from 'miragejs/-types';
import { ReactNode } from 'react';
import EndpointContext from '../context/endpointContext';
import useRecipes from '../hooks/useRecipes';

describe('Use recipes', () => {
    const recipes = [
        {
            id: '1',
            name: 'Buttermilk Pineapple Carrot Cake',
            ingredients: ['butter', 'sugar', 'buttermilk', 'egg', 'vanilla', 'flour', 'baking soda', 'salt', 'carrot', 'pineapple', 'walnut'],
            href: 'https://tasty.recipes/buttermilk-pineapple-carrot-cake/',
            image: 'https://tasty.recipes/wp-content/uploads/2019/02/76AEAAD2-B719-4FDA-BB1C-564462638DF6.jpeg',
        },
    ];
    let server: Server<Registry<AnyModels, AnyFactories>>;

    beforeEach(() => {
        server = createServer({
            logging: false,
            seeds(server) {
                server.db.loadData({
                    recipes: recipes as unknown as recipe[],
                } as { recipes: recipe[] });
            },

            routes() {
                this.get('/api/v1/recipes/:ingredients', (schema, request) =>
                    (schema.db.recipes as recipe[]).filter(recipe =>
                        request.params.ingredients.split(',').every(ingredient => recipe.ingredients.includes(ingredient)),
                    ),
                );
            },
        });
    });

    afterEach(() => {
        server.shutdown();
    });

    it('should not crash during use', () => {
        renderHook(({ ingredients }) => useRecipes(ingredients as string[]), {
            initialProps: {
                ingredients: [],
            },
        });
    });

    it('should return recipes with no valid ingredients', async () => {
        const wrapper = ({ children }: { children?: ReactNode | ReactNode[] }) => (
            <EndpointContext.Provider value={{ endpoint: '/api/v1/recipes/' }}>{children}</EndpointContext.Provider>
        );

        const { result } = renderHook(({ ingredients }) => useRecipes(ingredients as string[]), {
            initialProps: {
                ingredients: [],
            },
            wrapper,
        });

        expect(result.current).toEqual([]);
    });

    it('should return recipes with valid ingredient', async () => {
        const wrapper = ({ children }: { children?: ReactNode | ReactNode[] }) => (
            <EndpointContext.Provider value={{ endpoint: '/api/v1/recipes/' }}>{children}</EndpointContext.Provider>
        );

        const { result, waitForNextUpdate } = renderHook(({ ingredients }) => useRecipes(ingredients as string[]), {
            initialProps: {
                ingredients: ['butter'],
            },
            wrapper,
        });

        await waitForNextUpdate();

        expect(result.current).toEqual(recipes);
    });

    it('should return recipes with valid ingredients', async () => {
        const wrapper = ({ children }: { children?: ReactNode | ReactNode[] }) => (
            <EndpointContext.Provider value={{ endpoint: '/api/v1/recipes/' }}>{children}</EndpointContext.Provider>
        );

        const { result, waitForNextUpdate } = renderHook(({ ingredients }) => useRecipes(ingredients as string[]), {
            initialProps: {
                ingredients: ['butter', 'egg'],
            },
            wrapper,
        });

        await waitForNextUpdate();

        expect(result.current).toEqual(recipes);
    });

    it('should return recipes with invalid ingredient', async () => {
        const wrapper = ({ children }: { children?: ReactNode | ReactNode[] }) => (
            <EndpointContext.Provider value={{ endpoint: '/api/v1/recipes/' }}>{children}</EndpointContext.Provider>
        );

        const { result, waitForNextUpdate } = renderHook(({ ingredients }) => useRecipes(ingredients as string[]), {
            initialProps: {
                ingredients: ['butter', 'cocoa'],
            },
            wrapper,
        });

        await waitForNextUpdate();

        expect(result.current).toEqual([]);
    });
});
