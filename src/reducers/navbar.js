import * as types from "../actions/navbarTypes";

const initialSate = {
    show: true,
    showSearch: false,
};

const navbar = (state = initialSate, action) => {
    switch (action.type) {
    case types.TOGGLE_DISPLAY:
        return {
            ...state,
            show: !state.show,
        };
    case types.TOGGLE_SEARCH:
        return {
            ...state,
            showSearch: !state.showSearch,
        };
    case types.CLOSE_SEARCH:
        return {
            ...state,
            showSearch: false,
        };
    default:
        return state;
    }
};

export default navbar;
