import * as types from "./mapWrapTypes";

export const mapLoaded = mapRef => ({
    type: types.MAP_LOADED,
    mapRef,
});

export const cleanMarker = (marker) => {
    if (marker) {
        marker.setMap(null);
    }
    return {
        type: types.CLEAN_MARKER,
    };
};

const addMarker = marker => ({
    type: types.ADD_MARKER,
    marker,
});

export const changeMarker = marker =>
    (dispatch, getState) => {
        dispatch(cleanMarker(getState().mapWrap.addedMarker));
        dispatch(addMarker(marker));
        marker.setMap(getState().mapWrap.mapComponent.getStreetView());
    };
