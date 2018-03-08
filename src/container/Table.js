import { connect } from "react-redux";
import TableComponent from "../ui/Table";

import {
    setSelectedPokemonForDetails,
    openDetails,
} from "../actions/carouselActions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    setSelectedPokemonForDetails(pokemon) {
        dispatch(setSelectedPokemonForDetails(pokemon));
    },
    openDetails() {
        dispatch(openDetails());
    },
});

const Table = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TableComponent);

export default Table;
