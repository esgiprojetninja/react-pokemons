import { connect } from "react-redux";
import PokeSearchComponent from "../ui/PokeSearch";

import {
    toggleSearch,
    closeSearch,
} from "../actions/navbarActions";

import {
    setSearchedPokemons,
    setSearchedQuery,
    setSearchedType,
    resetSearchedParams,
    resetSearchedPokemons,
    removeSearchedParamsType,
} from "../actions/pokeSearchActions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    toggleSearch() {
        dispatch(toggleSearch());
    },
    closeSearch() {
        dispatch(closeSearch());
    },
    setSearchedPokemons(pokemons) {
        dispatch(setSearchedPokemons(pokemons));
    },
    setSearchedQuery(query) {
        dispatch(setSearchedQuery(query));
    },
    setSearchedType(newType) {
        dispatch(setSearchedType(newType));
    },
    resetSearchedParams() {
        dispatch(resetSearchedParams());
    },
    resetSearchedPokemons() {
        dispatch(resetSearchedPokemons());
    },
    removeSearchedParamsType(removedType) {
        dispatch(removeSearchedParamsType(removedType));
    },
});

const PokeSearch = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PokeSearchComponent);

export default PokeSearch;
