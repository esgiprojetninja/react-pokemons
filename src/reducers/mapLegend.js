import * as types from "../actions/mapLegendTypes";

const initialSate = {
    displayForm: false,
    selectedPokemon: {},
    placingPokemon: false,
};

const navbar = (state = initialSate, action) => {
    switch (action.type) {
    case types.TOGGLE_FORM:
        return {
            ...state,
            displayForm: !state.displayForm,
            placingPokemon: state.displayForm ? false : state.placingPokemon,
            selectedPokemon: {},
        };
    case types.OPEN_FORM:
        return {
            ...state,
            displayForm: true,
        };
    case types.TOGGLE_PLACING_POKEMON:
        return {
            ...state,
            placingPokemon: !state.placingPokemon,
        };
    case types.CHANGE_POKEMON:
        return {
            ...state,
            selectedPokemon: action.pokemon || {},
        };
    default:
        return state;
    }
};

export default navbar;
