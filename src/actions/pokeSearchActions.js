import * as types from "./pokeSearchTypes";

export const setSearchedPokemons = pokemons => ({
    type: types.SET_SEARCHED_POKEMONS,
    pokemons,
});

export const setSearchedQuery = query => ({
    type: types.SET_SEARCHED_QUERY,
    query,
});

export const setSearchedType = newType => ({
    type: types.SET_SEARCHED_TYPE,
    newType,
});

export const removeSearchedParamsType = removedType => ({
    type: types.REMOVE_SEARCHED_PARAMS_TYPE,
    removedType,
});

export const resetSearchedParams = () => ({
    type: types.RESET_SEARCHED_PARAMS,
});


export const resetSearchedPokemons = () => ({
    type: types.RESET_SEARCHED_POKEMONS,
});
