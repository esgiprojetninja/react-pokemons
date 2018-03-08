import React from "react";
import { PropTypes as T } from "prop-types";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from "material-ui/Snackbar";
import RaisedButton from "material-ui/RaisedButton";
import DoneSVG from "material-ui/svg-icons/action/done";
import * as tools from "../utils/verifTools";
import MapLegend from "../container/MapLegend";

const getGoogle = () => (
    "google" in window ? window.google : null
);

const styles = {
    containerElement: {
        height: "80%",
        minWidth: "320px",
    },
    validBtn: {
        width: "100%",
        maxWidth: "200px",
        bottom: "15px",
        left: "calc(50% - 40px)",
    },
};

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={3}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
        onClick={props.onMapClick}
    >
        {
            props.markers ? props.markers.map((marker, key) => (
                <Marker
                    {...marker}
                    key
                    onRightClick={props.onMarkerRightClick}
                />
            )) : []
        }
    </GoogleMap>
));

class MapContainer extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.ticketFunc = window.setInterval(() => {
        //     this.props.tickMarkers();
        // }, 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.ticketFunc);
    }
    handleMapClick = ({ latLng }) => {
        if (this.props.mapLegend.placingPokemon) {
            const google = getGoogle();
            this.props.changeMarker(new google.maps.Marker({
                position: latLng,
                icon: this.props.mapLegend.selectedPokemon.image,
            }));
        }
    }

    handleMarkerRightClick = targetMarker => ({})

    handleValidateMarker = () => {
        this.props.setNoticedAddingPokeLocationMsgFalse();
        this.props.validateAddedMarker(this.props.mapWrap.addedMarker);
    }

    renderSpinner() {
        return (
            <section
                style={{ background: this.props.theme.current.palette.primary1Color }}
                className="map-wrapper full-height full-width display-flex-row space-around"
            >
                <div
                    style={{
                        ...styles.containerElement,
                        background: this.props.theme.current.palette.primary2Color,
                    }}
                    className="display-flex-column space-around margin-auto width-14"
                >
                    <CircularProgress className="margin-reset" color="white" size={80} thickness={5} />
                </div>
                <MapLegend />
            </section>
        );
    }

    renderValidatingBtn() {
        const { addedMarker } = this.props.mapWrap;
        const wasMarkerAdded = () => addedMarker !== null;
        return (
            <RaisedButton
                label="valider"
                secondary={true} // eslint-disable-line
                icon={<DoneSVG />}
                style={styles.validBtn}
                className="absolute margin-auto"
                disabled={!wasMarkerAdded()}
                onTouchTap={this.handleValidateMarker}
            />
        );
    }

    renderMap() {
        const focusStyle = this.props.mapLegend.placingPokemon ? {
            border: "2px solid",
            borderColor: this.props.theme.current.palette.accent1Color,
        } : {};
        return (
            <section
                style={{
                    background: this.props.theme.current.palette.primary1Color,
                    padding: "10px 0",
                }}
                className="map-wrapper full-height full-width display-flex-row space-around relative"
            >
                <GettingStartedGoogleMap
                    containerElement={
                        <div
                            style={{
                                ...styles.containerElement,
                                ...focusStyle,
                            }}
                            className="margin-auto width-14"
                        />
                    }
                    mapElement={
                        <div className="full-height full-width" />
                    }
                    markers={this.props.pokemons.marked}
                    onMapLoad={this.props.mapLoaded}
                    onMapClick={this.handleMapClick}
                    onMarkerRightClick={this.handleMarkerRightClick}
                />
                <MapLegend />
                {this.renderValidatingBtn()}
                <Snackbar
                    open={
                        this.props.pokemons.addingPokemonMarker &&
                        !this.props.mapContainer.noticedAddingSignalment
                    }
                    message="Signalement envoyé"
                    action="ok"
                    autoHideDuration={4000}
                    onTouchTap={this.props.setNoticedAddingPokeLocationMsgTrue}
                    onRequestClose={this.props.setNoticedAddingPokeLocationMsgTrue}
                />
                <Snackbar
                    open={!this.props.mapContainer.noticedAddedSignalment}
                    message="Signalement enregistré !"
                    action="ok"
                    autoHideDuration={4000}
                    onTouchTap={this.props.setNoticedAddEDPokeLocationMsgTrue}
                    onRequestClose={this.props.setNoticedAddEDPokeLocationMsgTrue}
                />
                <Snackbar
                    open={!this.props.mapContainer.noticedFailedAddedSignalment}
                    message="Le signalement a échoué !"
                    action="ok"
                    autoHideDuration={4000}
                    onTouchTap={this.props.setNoticedFailedAddEDPokeLocationMsgTrue}
                    onRequestClose={this.props.setNoticedFailedAddEDPokeLocationMsgTrue}
                />
            </section>
        );
    }

    render() {
        if (!getGoogle()) {
            return null;
        }
        // return tools.isArray(this.props.pokemons.marked) ?
        return this.renderMap();
        // this.renderSpinner();
    }
}
MapContainer.propTypes = {
    mapLoaded: T.func.isRequired,
    changeMarker: T.func.isRequired,
    tickMarkers: T.func.isRequired,
    validateAddedMarker: T.func.isRequired,
    setNoticedAddingPokeLocationMsgTrue: T.func.isRequired,
    setNoticedAddingPokeLocationMsgFalse: T.func.isRequired,
    setNoticedFailedAddEDPokeLocationMsgTrue: T.func.isRequired,
    setNoticedAddEDPokeLocationMsgTrue: T.func.isRequired,
    pokemons: T.shape({
        isFetching: T.bool.isRequired,
        addingPokemonMarker: T.bool.isRequired,
        marked: T.array,
    }).isRequired,
    mapContainer: T.shape({
        noticedAddingSignalment: T.bool.isRequired,
        noticedAddedSignalment: T.bool.isRequired,
        noticedFailedAddedSignalment: T.bool.isRequired,
    }).isRequired,
    theme: T.shape({
        current: T.shape({
            palette: T.shape({
                accent1Color: T.string.isRequired,
                primary1Color: T.string.isRequired,
                primary2Color: T.string.isRequired,
            }),
        }).isRequired,
    }).isRequired,
    mapLegend: T.shape({
        placingPokemon: T.bool.isRequired,
        selectedPokemon: T.shape({
            image: T.string,
        }),
    }).isRequired,
    mapWrap: T.shape({
        addedMarker: T.any,
    }).isRequired,
};
export default MapContainer;
