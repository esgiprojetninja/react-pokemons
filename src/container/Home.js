import { connect } from "react-redux";
import HomeComponent from "../ui/Home";

import {
    toggleView,
    getTableView,
} from "../actions/homeActions";

import {
    openForm,
    togglePlacingPokemon,
    setSelectedPokemon,
} from "../actions/mapLegendActions";

import {
    setSelectedPokemonForDetails,
    openDetails,
} from "../actions/carouselActions";

import {
    resetSearchedPokemons,
} from "../actions/pokeSearchActions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    setSelectedPokemonForDetails(pokemon) {
        dispatch(setSelectedPokemonForDetails(pokemon));
    },
    toggleView() {
        dispatch(toggleView());
    },
    openDetails() {
        dispatch(openDetails());
    },
    getTableView() {
        dispatch(getTableView());
    },
    resetSearchedPokemons() {
        dispatch(resetSearchedPokemons());
    },
    openForm() {
        dispatch(openForm());
    },
    setSelectedPokemon(pokemon) {
        dispatch(setSelectedPokemon(pokemon));
    },
    togglePlacingPokemon() {
        dispatch(togglePlacingPokemon());
    },
});

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComponent);

export default Home;
