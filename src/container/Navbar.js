import { connect } from "react-redux";
import NavbarComponent from "../ui/Navbar";

import {
    toggleNavbar,
    toggleSearch,
    closeSearch,
} from "../actions/navbarActions";

import {
    getTableView,
} from "../actions/homeActions";

import {
    resetSearchedPokemons,
    resetSearchedParams,
} from "../actions/pokeSearchActions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    toggleNavbar() {
        dispatch(toggleNavbar());
    },
    closeSearch() {
        dispatch(closeSearch());
    },
    toggleSearch() {
        dispatch(toggleSearch());
    },
    resetSearchedParams() {
        dispatch(resetSearchedParams());
    },
    getTableView() {
        dispatch(getTableView());
    },
    resetSearchedPokemons() {
        dispatch(resetSearchedPokemons());
    },
});

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarComponent);

export default Navbar;
