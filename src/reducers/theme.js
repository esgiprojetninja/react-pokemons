import * as types from "../actions/themeTypes";

const initialSate = {
    current: undefined,
};

const theme = (state = initialSate, action) => {
    switch (action.type) {
    case types.INIT_THEME:
        return {
            ...state,
            current: state.current || action.theme,
        };
    default:
        return state;
    }
};

export default theme;
