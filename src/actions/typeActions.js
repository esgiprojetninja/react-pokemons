import * as types from "./typeTypes";

import TypeApi from "../api/type";

const typeApi = new TypeApi();

const requestDispatched = () => ({
    type: types.REQUESTING,
});

const requestFailed = error => ({
    type: types.REQUEST_FAIL,
    error,
});

const receivedAllTypes = typesApi => ({
    type: types.RECEIVED_ALL_TYPES,
    typesApi,
});
/* eslint-disable */
export const getAllTypes = () =>
    (dispatch) => {
        dispatch(requestDispatched());
        typeApi.getAllTypes()
            .then( response => {
                if(response.error) {
                    dispatch(requestFailed());
                } else {
                    dispatch(receivedAllTypes(response.data));
                }
            })
            .catch( error => dispatch(requestFailed(error)));
    };

/* eslint-enable */
