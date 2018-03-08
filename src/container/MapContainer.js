import { connect } from "react-redux";
import MapContainerComponent from "../ui/MapContainer";
import {
    mapLoaded,
    cleanMarker,
    changeMarker,
} from "../actions/mapWrapActions";
import {
    toggleForm,
} from "../actions/mapLegendActions";
import {
    signalPosition,
    tickMarkers,
} from "../actions/pokemonActions";
import {
    setNoticedAddingPokeLocationMsgTrue,
    setNoticedAddingPokeLocationMsgFalse,
    setNoticedAddEDPokeLocationMsgTrue,
    setNoticedAddEDPokeLocationMsgFalse,
    setNoticedFailedAddEDPokeLocationMsgTrue,
    setNoticedFailedAddEDPokeLocationMsgFalse,
} from "../actions/mapContainerActions";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    mapLoaded(mapComponent) {
        dispatch(mapLoaded(mapComponent));
    },
    tickMarkers() {
        dispatch(tickMarkers());
    },
    changeMarker(marker) {
        dispatch(changeMarker(marker));
    },
    validateAddedMarker(marker) {
        dispatch(signalPosition(marker));
        dispatch(cleanMarker());
        dispatch(toggleForm());
    },
    setNoticedAddingPokeLocationMsgTrue() {
        dispatch(setNoticedAddingPokeLocationMsgTrue());
    },
    setNoticedAddingPokeLocationMsgFalse() {
        dispatch(setNoticedAddingPokeLocationMsgFalse());
    },
    setNoticedAddEDPokeLocationMsgTrue() {
        dispatch(setNoticedAddEDPokeLocationMsgTrue());
    },
    setNoticedAddEDPokeLocationMsgFalse() {
        dispatch(setNoticedAddEDPokeLocationMsgFalse());
    },
    setNoticedFailedAddEDPokeLocationMsgTrue() {
        dispatch(setNoticedFailedAddEDPokeLocationMsgTrue());
    },
    setNoticedFailedAddEDPokeLocationMsgFalse() {
        dispatch(setNoticedFailedAddEDPokeLocationMsgFalse());
    },
});

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapContainerComponent);

export default MapContainer;
