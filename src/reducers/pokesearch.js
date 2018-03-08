import * as types from "../actions/pokeSearchTypes";

const initialSate = {
    searchedPokemons: false,
    searchedParams: {
        query: null,
        pokemonType: [],
    },
};

const pokesearch = (state = initialSate, action) => {
    switch (action.type) {
    case types.SET_SEARCHED_POKEMONS:
        return {
            ...state,
            searchedPokemons: action.pokemons,
        };
    case types.SET_SEARCHED_QUERY:
        return {
            ...state,
            searchedParams: {
                ...state.searchedParams,
                query: action.query || null,
            },
        };
    case types.SET_SEARCHED_TYPE:
        return {
            ...state,
            searchedParams: {
                ...state.searchedParams,
                pokemonType: [
                    ...state.searchedParams.pokemonType,
                    action.newType,
                ],
            },
        };
    case types.REMOVE_SEARCHED_PARAMS_TYPE:
        return {
            ...state,
            searchedParams: {
                ...state.searchedParams,
                pokemonType: [
                    ...state.searchedParams.pokemonType
                        .filter(element => element !== action.removedType),
                ],
            },
        };
    case types.RESET_SEARCHED_PARAMS:
        return {
            ...state,
            searchedParams: {
                ...state.searchedParams,
                query: null,
                pokemonType: [],
            },
        };
    case types.RESET_SEARCHED_POKEMONS:
        return {
            ...state,
            searchedPokemons: [],
        };
    default:
        return state;
    }
};

export default pokesearch;
