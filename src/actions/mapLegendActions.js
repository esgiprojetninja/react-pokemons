import * as types from "./mapLegendTypes";

export const toggleForm = () => ({
    type: types.TOGGLE_FORM,
});
export const togglePlacingPokemon = () => ({
    type: types.TOGGLE_PLACING_POKEMON,
});
export const setSelectedPokemon = pokemon => ({
    type: types.CHANGE_POKEMON,
    pokemon,
});
export const openForm = () => ({
    type: types.OPEN_FORM,
});
