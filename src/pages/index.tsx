import { MouseEvent, useState, useRef, useEffect, RefObject } from 'react';
import HorizontalScrollingList from '../components/horizontalScrollingList';
import Header from '../components/header';
import Ingredient from '../components/ingredient';
import Search from '../components/search';
import Title from '../components/title';
import useRecipes from '../hooks/useRecipes';
import MainGrid from '../components/mainGrid';
import Recipe from '../components/recipe';
import RecipesAmountHeading from '../components/recipesAmountHeading';
import HorizontalCenter from '../components/horizontalCenter';

const Index = () => {
    const [ingredients, setIngredients] = useState([] as string[]);

    const [currentSearch, setCurrentSearch] = useState('');
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSearch(() => event.target.value);
    };

    const addIngredient = (ingredient: string) => {
        if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
            setIngredients(previousIngredient => [
                ...previousIngredient,
                ...ingredient
                    .trim()
                    .split(',')
                    .map(ingredient => ingredient.trim()),
            ]);
        }
    };

    const onRemoveIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIngredients(previousIngredients =>
            previousIngredients.filter(ingredient => ingredient !== (event.target as HTMLButtonElement).dataset.ingredientname),
        );
    };

    const searchSubmit = () => {
        addIngredient(currentSearch);
        setCurrentSearch(() => '');
    };

    const onSearchSubmit = () => {
        searchSubmit();
    };

    const onSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchSubmit();
        }
    };

    const onTagClick = (event: MouseEvent<HTMLLIElement>) => {
        addIngredient((event.target as HTMLLIElement).dataset.tagname as string);
    };

    const recipes = useRecipes(ingredients);
    const recipesRef = useRef();

    useEffect(() => {
        if (recipes.length && recipesRef.current) {
            (recipesRef.current as unknown as HTMLElement).scrollIntoView({ behavior: 'smooth' });
        }
    }, [recipes]);

    return (
        <>
            <Header>
                <Title>Welcome to Recipe Finder</Title>
                <Search
                    value={currentSearch}
                    onChange={onSearchChange}
                    onKeyPress={onSearchEnter}
                    onSubmit={onSearchSubmit}
                    firstUse={!ingredients.length}
                />
                <HorizontalScrollingList>
                    {ingredients.map(ingredient => (
                        <Ingredient key={ingredient} name={ingredient} onRemove={onRemoveIngredient} />
                    ))}
                </HorizontalScrollingList>
            </Header>
            {ingredients.length > 0 && (
                <>
                    <HorizontalCenter ref={recipesRef as unknown as RefObject<HTMLDivElement>}>
                        <RecipesAmountHeading>
                            {recipes.length > 0 ? `Found ${recipes.length} recipes:` : "Couldn't find any recipes with these ingredients."}
                        </RecipesAmountHeading>
                    </HorizontalCenter>
                    {recipes.length > 0 && (
                        <MainGrid>
                            {recipes.map(recipeData => (
                                <Recipe recipeData={recipeData} key={recipeData.id} onTagClick={onTagClick} />
                            ))}
                        </MainGrid>
                    )}
                </>
            )}
        </>
    );
};

export default Index;
