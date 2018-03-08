import { connect } from "react-redux";
import MapLegendComponent from "../ui/MapLegend";
import {
    toggleForm,
    openForm,
    togglePlacingPokemon,
    setSelectedPokemon,
} from "../actions/mapLegendActions";
import {
    cleanMarker,
} from "../actions/mapWrapActions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    toggleForm() {
        dispatch(toggleForm());
    },
    togglePlacingPokemon() {
        dispatch(togglePlacingPokemon());
    },
    setSelectedPokemon(pokemon) {
        dispatch(setSelectedPokemon(pokemon));
    },
    cleanMarker(marker) {
        dispatch(cleanMarker(marker));
    },
    openForm() {
        dispatch(openForm());
    },
});

const MapLegend = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapLegendComponent);

export default MapLegend;
