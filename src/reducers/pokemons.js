import * as types from "../actions/pokemonTypes";

import { getTimeDropped } from "../utils/dateTools";
import { isArray } from "../utils/verifTools";

const DEFAULT_MARKER_ANIMATION = 2;

const initialSate = {
    all: null,
    marked: null,
    isFetching: false,
    addingPokemonMarker: false,
    requestFailMsg: false,
};

const pokemons = (state = initialSate, action) => {
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
            addingPokemonMarker: false,
            requestFailMsg: action.error,
        };
    case types.RECEIVED_ALL_POKEMONS:
        return {
            ...state,
            isFetching: false,
            all: action.pokemons
                .map(pokemon => ({
                    id: pokemon._id, // eslint-disable-line
                    type: [pokemon.type1, pokemon.type2].filter(t => t),
                    ...pokemon,
                    evolutions: action.pokemons
                        .find(poke => poke.id_parent === pokemon.id_national) ?
                        action.pokemons
                            .filter(poke => poke.id_parent === pokemon.id_national)
                            .map(pokemon2 => ({
                                ...pokemon2,
                                evolutions: action.pokemons
                                    .find(poke => poke.id_parent === pokemon2.id_national) ?
                                    action.pokemons
                                        .filter(poke => poke.id_parent === pokemon2.id_national) :
                                    false,
                            }))
                        : null,
                })),
        };
    case types.RECEIVED_MARKED_POKEMONS:
        return {
            ...state,
            isFetching: false,
            marked: action.pokemons.map(poke => (
                {
                    ...poke,
                    position: {
                        lat: Number(poke.latitude),
                        lng: Number(poke.longitude),
                    },
                    defaultAnimation: DEFAULT_MARKER_ANIMATION,
                    label: getTimeDropped(poke.date_created),
                })),
        };
    case types.RECEIVED_SIGNAL_SUCCESS:
        return {
            ...state,
            addingPokemonMarker: false,
            marked: [...state.marked, action.marker],
        };
    case types.ADDING_POKEMON_MARKER:
        return {
            ...state,
            addingPokemonMarker: true,
        };
    case types.TICK_MARKERS:
        return {
            ...state,
            marked: isArray(state.marked) ?
                state.marked.map(poke => ({ ...poke, label: getTimeDropped(poke.date_created) })) :
                state.marked,
        };
    case types.SUCCESS_UPDATE_POKEMON:
        return {
            ...state,
            isFetching: false,
            all: state.all
                .map(pokemon => (
                    pokemon.id_national === action.pokemon.id_national ?
                        {
                            id: action.pokemon._id, // eslint-disable-line
                            type: [action.pokemon.type1, action.pokemon.type2].filter(t => t),
                            ...action.pokemon,
                            evolutions: state.all
                                .find(poke => poke.id_parent === pokemon.id_national) ?
                                state.all
                                    .filter(poke => poke.id_parent === pokemon.id_national)
                                    .map(pokemon2 => ({
                                        ...pokemon2,
                                        evolutions: state.all
                                            .find(poke => poke.id_parent === pokemon2.id_national) ?
                                            state.all
                                                .filter(poke =>
                                                    poke.id_parent === pokemon2.id_national) :
                                            false,
                                    }))
                                : null,
                        }
                        : pokemon
                )),
        };
    case types.FAIL_UPDATE_POKEMON:
        return {
            ...state,
            isFetching: false,
        };
    default:
        return state;
    }
};

export default pokemons;
