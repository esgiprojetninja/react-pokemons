import * as types from "../actions/tableTypes";

const initialSate = {
    show: true,
};

const table = (state = initialSate, action) => {
    switch (action.type) {
    case types.TOGGLE_DISPLAY:
        return {
            ...state,
            show: !state.show,
        };
    default:
        return state;
    }
};

export default table;
