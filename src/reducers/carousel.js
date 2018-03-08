import * as types from "../actions/carouselTypes";

const initialSate = {
    showDetails: false,
    selectedCurrent: {},
};

const carousel = (state = initialSate, action) => {
    switch (action.type) {
    case types.SET_CURRENT:
        return {
            ...state,
            selectedCurrent: action.currentPokemon || {},
        };
    case types.TOGGLE_DETAILS:
        return {
            ...state,
            showDetails: !state.showDetails,
        };
    default:
        return state;
    }
};

export default carousel;
