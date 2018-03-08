import * as types from "../actions/mapContainerTypes";

const initialSate = {
    noticedAddingSignalment: false,
    noticedAddedSignalment: true,
    noticedFailedAddedSignalment: true,
};

const mapContainer = (state = initialSate, action) => {
    switch (action.type) {
    case types.NOTICED_ADDING_SIGNAL_MSG_TRUE:
        return {
            ...state,
            noticedAddingSignalment: true,
        };
    case types.NOTICED_ADDING_SIGNAL_MSG_FALSE:
        return {
            ...state,
            noticedAddingSignalment: false,
        };
    case types.NOTICED_ADDED_SIGNAL_MSG_TRUE:
        return {
            ...state,
            noticedAddedSignalment: true,
        };
    case types.NOTICED_ADDED_SIGNAL_MSG_FALSE:
        return {
            ...state,
            noticedAddedSignalment: false,
        };
    case types.NOTICED_FAIL_ADDED_SIGNAL_MSG_TRUE:
        return {
            ...state,
            noticedFailedAddedSignalment: true,
        };
    case types.NOTICED_FAIL_ADDED_SIGNAL_MSG_FALSE:
        return {
            ...state,
            noticedFailedAddedSignalment: false,
        };
    default:
        return state;
    }
};

export default mapContainer;
