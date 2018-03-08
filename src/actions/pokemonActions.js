import * as types from "./pokemonTypes";
import {
    setNoticedAddEDPokeLocationMsgFalse,
    setNoticedFailedAddEDPokeLocationMsgFalse,
} from "./mapContainerActions";
import { cleanMarker } from "./mapWrapActions";
import PokemonApi from "../api/pokemon";

const pokemonApi = new PokemonApi();

const requestDispatched = () => ({
    type: types.REQUESTING,
});

const requestFailed = error => ({
    type: types.REQUEST_FAIL,
    error,
});

const receivedAllPokemons = pokemons => ({
    type: types.RECEIVED_ALL_POKEMONS,
    pokemons,
});

const receivedMarkedPokemons = pokemons => ({
    type: types.RECEIVED_MARKED_POKEMONS,
    pokemons,
});

export const getAll = () =>
    (dispatch) => {
        dispatch(requestDispatched());
        pokemonApi.getAll()
            .then((response) => {
                if (response.error) {
                    dispatch(requestFailed());
                } else {
                    dispatch(receivedAllPokemons(response));
                }
            })
            .catch(error => dispatch(requestFailed(error)));
    };


export const getMarked = () =>
    (dispatch) => {
        dispatch(requestDispatched());
        pokemonApi.getMarked()
            .then((response) => {
                if (response.error) {
                    dispatch(requestFailed());
                } else {
                    dispatch(receivedMarkedPokemons(response.data));
                }
            })
            .catch(err => dispatch(requestFailed(err)));
    };

const addingLocation = () => ({
    type: types.ADDING_POKEMON_MARKER,
});

const receivedSignalSucces = marker => ({
    type: types.RECEIVED_SIGNAL_SUCCESS,
    marker,
});

export const signalPosition = addedMarker =>
    (dispatch, getState) => {
        dispatch(addingLocation());
        const lat = getState().mapWrap.addedMarker.position.lat();
        const lng = getState().mapWrap.addedMarker.position.lng();
        const { idPokemon } = getState().mapLegend.selectedPokemon;
        pokemonApi.signal(idPokemon, lat, lng)
            .then((response) => {
                if (response.error) {
                    dispatch(setNoticedFailedAddEDPokeLocationMsgFalse());
                    dispatch(cleanMarker(addedMarker));
                    dispatch(requestFailed());
                } else {
                    dispatch(setNoticedAddEDPokeLocationMsgFalse());
                    dispatch(receivedSignalSucces(addedMarker));
                    dispatch(getMarked());
                }
            })
            .catch(err => dispatch(requestFailed(err)));
    };

export const tickMarkers = () => ({
    type: types.TICK_MARKERS,
});
