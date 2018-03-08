import * as types from "./navbarTypes";

export const toggleNavbar = () => ({
    type: types.TOGGLE_DISPLAY,
});

export const toggleSearch = () => ({
    type: types.TOGGLE_SEARCH,
});

export const closeSearch = () => ({
    type: types.CLOSE_SEARCH,
});
