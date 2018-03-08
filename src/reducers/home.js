import * as types from "../actions/homeTypes";

const initialSate = {
    showCarousel: true,
};

const home = (state = initialSate, action) => {
    switch (action.type) {
    case types.TOGGLE_CAROUSEL:
        return {
            ...state,
            showCarousel: !state.showCarousel,
        };
    case types.GET_TABLE_VIEW:
        return {
            ...state,
            showCarousel: false,
        };
    default:
        return state;
    }
};

export default home;
