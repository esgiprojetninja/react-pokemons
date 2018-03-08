import * as types from "../actions/typeTypes";

const initialSate = {
    all: false,
    isFetching: false,
    requestFailMsg: false,
};

const typesApi = (state = initialSate, action) => {
    switch (action.type) {
    case types.REQUESTING:
        return {
            ...state,
            isFetching: true,
        };
    case types.REQUEST_FAIL:
        return {
            ...state,
            isFetching: false,
            requestFailMsg: action.error,
        };
    case types.RECEIVED_ALL_TYPES:
        return {
            ...state,
            isFetching: false,
            all: action.typesApi,
        };
    default:
        return state;
    }
};

export default typesApi;
