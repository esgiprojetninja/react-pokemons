import * as types from "./carouselTypes";

export const setSelectedPokemonForDetails = currentPokemon => ({
    type: types.SET_CURRENT,
    currentPokemon,
});

export const openDetails = () => ({
    type: types.TOGGLE_DETAILS,
});
