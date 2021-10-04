import { createServer } from 'miragejs';
import { ThemeProvider } from 'styled-components';
import EndpointContext from './context/endpointContext';
import KnownIngredientsContext from './context/knownIngredientsContext';
import Index from './pages/index';
import theme from './themes/theme';
import mockRecipies from './utility/mockRecipies';

createServer({
    seeds(server) {
        server.db.loadData({
            recipies: mockRecipies,
        } as { recipies: recipe[] });
    },

    routes() {
        this.get('/api/v1/recipes/:ingredients', (schema, request) =>
            (schema.db.recipies as recipe[]).filter(recipe =>
                request.params.ingredients.split(',').every(ingredient => recipe.ingredients.includes(ingredient)),
            ),
        );
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <KnownIngredientsContext.Provider value={{ knownIngredients: ['butter', 'onion', 'salt', 'flour', 'carrot', 'pepper', 'chicken'] }}>
                <EndpointContext.Provider value={{ endpoint: '/api/v1/recipes/' }}>
                    <Index />
                </EndpointContext.Provider>
            </KnownIngredientsContext.Provider>
        </ThemeProvider>
    );
}

export default App;
