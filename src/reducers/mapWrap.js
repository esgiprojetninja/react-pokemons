import * as types from "../actions/mapWrapTypes";

const initialSate = {
    mapComponent: null,
    addedMarker: null,
};

const mapWrap = (state = initialSate, action) => {
    switch (action.type) {
    case types.MAP_LOADED:
        return {
            ...state,
            mapComponent: action.mapRef,
        };
    case types.ADD_MARKER:
        return {
            ...state,
            addedMarker: action.marker,
        };
    case types.CLEAN_MARKER:
        return {
            ...state,
            addedMarker: null,
        };
    default:
        return state;
    }
};

export default mapWrap;
