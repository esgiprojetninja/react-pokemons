import * as types from "./mapContainerTypes";

export const setNoticedAddingPokeLocationMsgTrue = () => ({
    type: types.NOTICED_ADDING_SIGNAL_MSG_TRUE,
});
export const setNoticedAddingPokeLocationMsgFalse = () => ({
    type: types.NOTICED_ADDING_SIGNAL_MSG_FALSE,
});

export const setNoticedAddEDPokeLocationMsgTrue = () => ({
    type: types.NOTICED_ADDED_SIGNAL_MSG_TRUE,
});
export const setNoticedAddEDPokeLocationMsgFalse = () => ({
    type: types.NOTICED_ADDED_SIGNAL_MSG_FALSE,
});

export const setNoticedFailedAddEDPokeLocationMsgTrue = () => ({
    type: types.NOTICED_FAIL_ADDED_SIGNAL_MSG_TRUE,
});
export const setNoticedFailedAddEDPokeLocationMsgFalse = () => ({
    type: types.NOTICED_FAIL_ADDED_SIGNAL_MSG_FALSE,
});
