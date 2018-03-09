import React from "react";
import { PropTypes as T } from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import DashboardSVG from "material-ui/svg-icons/action/dashboard";
import IconButton from "material-ui/IconButton";
import FullscreenSVG from "material-ui/svg-icons/navigation/fullscreen";
import AddCircleOutlineSVG from "material-ui/svg-icons/content/add-circle-outline";
import ArrowForwardSVG from "material-ui/svg-icons/navigation/arrow-forward";
import Screenfull from "screenfull";
import Close from "material-ui/svg-icons/action/highlight-off";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import scrollToElement from "scroll-to-element";
import ZeroFill from "zero-fill";
import MapContainer from "../container/MapContainer";
import Carousel from "../container/Carousel";
import SubHome from "../container/SubHome";
import Table from "../container/Table";
import PokeSearch from "../container/PokeSearch";

const styles = {
    buttonClose: {
        position: "absolute",
        top: "0",
        right: "0",
        margin: "15px",
        height: "100px",
        width: "100px",
    },
    iconClose: {
        color: "white",
        height: "80px",
        width: "80px",
    },
    icon: {
        height: "30px",
        color: "white",
    },
    pokemonName: {
        fontSize: "35px",
        fontWeight: 800,
    },
    pokemonId: {
        fontSize: "25px",
        marginTop: 0,
    },
    containerElement: {
        height: "80%",
        minWidth: "320px",
    },
};

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={3}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
        onClick={props.onMapClick}
    >
        {props.markers.map((marker, key) => (
            <Marker
                {...marker}
                key
                onRightClick={() => props.onMarkerRightClick(key)}
            />
        ))}
    </GoogleMap>
));

class Home extends React.PureComponent {
    renderSearchWrapper() {
        if (this.props.navbar.showSearch) {
            return (
                <div>
                    <PokeSearch />
                </div>
            );
        }
        return null;
    }

    renderOnToggleView() {
        if (this.props.home.showCarousel) {
            return (
                <Grid className="animate fadeInRight" style={{ height: "100vh" }}>
                    <Row className="show-grid" >
                        <Col md={8} mdOffset={2}>
                            <Carousel />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={12}>
                            <SubHome />
                        </Col>
                    </Row>
                </Grid>
            );
        }
        return (
            <Row className="show-grid full-height">
                <Col md={12} className="full-height">
                    <Table />
                </Col>
            </Row>
        );
    }

    renderPokemonDetailsCurrent() {
        if (this.props.carousel.selectedCurrent && this.props.carousel.selectedCurrent.image) {
            return (
                <div>
                    <img
                        className="pokemon-details pokemon-current"
                        alt="chibar"
                        src={this.props.carousel.selectedCurrent.image}
                    />
                </div>
            );
        }
        return null;
    }

    renderPokemonDetailsSecondThisEvolution(thisPp, thisKeyy) {
        return (
            <div className="align">
                <IconButton
                    children={<ArrowForwardSVG/>} // eslint-disable-line
                />
                <img
                    key={`${thisKeyy}-${thisPp.id}-last`}
                    alt="chibar"
                    className="pokemon-details pokemon-evolution"
                    src={
                        this.props.carousel.selectedCurrent
                            .evolutions[thisKeyy]
                            .evolutions[thisKeyy].image
                    }
                    onTouchTap={
                        () => {
                            this
                                .props
                                .setSelectedPokemonForDetails(this.props
                                    .carousel.selectedCurrent
                                    .evolutions[thisKeyy].evolutions[thisKeyy]);
                        }
                    }
                />
            </div>
        );
    }

    renderPokemonDetailsThisEvolution(thisP, thisKey) {
        return (
            <div className="align">
                <IconButton
                    children={<ArrowForwardSVG/>} // eslint-disable-line
                />
                <img
                    key={`${thisKey}-${thisP.id}`}
                    className="pokemon-details pokemon-evolution"
                    src={thisP.image}
                    alt="chibar"
                    onTouchTap={
                        () => {
                            this
                                .props
                                .setSelectedPokemonForDetails(this.props
                                    .carousel.selectedCurrent.evolutions[thisKey]);
                        }
                    }
                />
                {this.renderPokemonDetailsSecondEvolution(thisP, thisKey)}
            </div>
        );
    }

    renderPokemonDetailsSecondEvolution(thisP, thisKey) {
        if (this.props.carousel.selectedCurrent.evolutions[thisKey].evolutions) {
            return (
                <div>
                    {
                        (this.props.carousel
                            .selectedCurrent.evolutions[thisKey].evolutions
                            .map((thisPp, thisKeyy) =>
                                this.renderPokemonDetailsSecondThisEvolution(thisPp, thisKeyy)))
                    }
                </div>
            );
        }
        return null;
    }

    renderPokemonDetailsFirstEvolution() {
        if (this.props.carousel.selectedCurrent.evolutions) {
            return (
                <div>
                    {
                        (this.props.carousel.selectedCurrent.evolutions
                            .map((thisP, thisKey) =>
                                this.renderPokemonDetailsThisEvolution(thisP, thisKey)))
                    }
                </div>
            );
        }
        return null;
    }

    renderPokemonDetailsSecondStarter(starter) {
        if (starter && starter.id_parent && this.props.pokemons.all) {
            const starter2 = this.props.pokemons.all
                .find(element => element.id_national === starter.id_parent);
            if (starter2 && starter2.image) {
                return (
                    <div className="align">
                        <img
                            className="pokemon-details pokemon-evolution"
                            src={starter2.image}
                            alt="chibar"
                            onTouchTap={
                                () => {
                                    this.props.setSelectedPokemonForDetails(starter2);
                                }
                            }
                        />
                        <IconButton
                            children={<ArrowForwardSVG/>} // eslint-disable-line
                        />
                    </div>
                );
            }
        }
        return null;
    }

    renderPokemonDetailsFirstStarter() {
        if (this.props.carousel.selectedCurrent.id_parent) {
            const starter = this.props.pokemons.all
                .find(e => e.id_national === this.props.carousel.selectedCurrent.id_parent);
            if (starter) {
                return (
                    <div className="align">
                        {this.renderPokemonDetailsSecondStarter(starter)}
                        <img
                            className="pokemon-details pokemon-evolution"
                            alt="chibar"
                            src={starter.image}
                            onTouchTap={
                                () => {
                                    this.props.setSelectedPokemonForDetails(starter);
                                }
                            }
                        />
                        <IconButton
                            children={<ArrowForwardSVG/>} // eslint-disable-line
                        />
                    </div>
                );
            }
        }
        return null;
    }

    renderPokemonDetailsEvolution() {
        return (
            <div className="align">
                {this.renderPokemonDetailsFirstStarter()}
                {this.renderPokemonDetailsCurrent()}
                {this.renderPokemonDetailsFirstEvolution()}
            </div>
        );
    }

    renderPokemonTypes(typeID) {
        if (!this.props.types.all) return null;
        const type = this.props.types.all.find(t => t.id === typeID);
        if (!type) return null;
        return (
            <div
                key={type.id}
                className="card-type card-type-size"
                style={{ display: "initial" }}
            >
                <span className="type" style={{ background: type.color }}>{type.title}</span>
            </div>
        );
    }

    renderPokemonDetailsMap() {
        if (this.props.pokemons.marked &&
            this.props.pokemons.marked
                .find(poke => poke.id_pokemon === this.props.carousel.selectedCurrent.id_pokemon)) {
            return (
                <Col md={12} style={{ height: "300px", marginTop: "20px", paddingBottom: "30px" }}>
                    <GettingStartedGoogleMap
                        containerElement={
                            <div className="full-height" />
                        }
                        mapElement={
                            <div className="full-height full-width" />
                        }
                        markers={
                            this.props.pokemons.marked ?
                                this.props.pokemons.marked
                                    .filter(poke =>
                                        poke.id_pokemon === this.props
                                            .carousel.selectedCurrent.id_pokemon)
                                : []
                        }
                    />
                    <span className="card-details-section-title text-center" style={{ marginTop: "15px" }}>Map</span>
                </Col>
            );
        }
        return (
            <Col md={12} className="text-center" style={{ marginTop: "15px" }}>
                <span style={{ marginRight: "15px" }}>{this.props.carousel.selectedCurrent.name} n&#39;est pas renseigné sur la map.</span>
                <RaisedButton
                    target="_blank"
                    label="Ajouter"
                    labelColor="#ffffff"
                    secondary={true} // eslint-disable-line
                    buttonStyle={{ backgroundColor: "#a4c639" }}
                    icon={<AddCircleOutlineSVG />}
                    onTouchTap={
                        () => {
                            scrollToElement(".map-wrapper");
                            this.props.openDetails();
                            this.props.openForm();
                            this.props.setSelectedPokemon(this.props.carousel.selectedCurrent);
                            this.props.togglePlacingPokemon();
                        }
                    }
                />
                <span className="card-details-section-title text-center" style={{ marginTop: "10px", marginBottom: "10px" }}>Map</span>
            </Col>
        );
    }

    renderPokemonDetails() {
        if (this.props.carousel.showDetails) {
            const currentPokemon = this.props.pokemons.all
                .find(poke => poke.id_national === this.props.carousel.selectedCurrent.id_national);
            return (
                <div className="card-details align full-height full-width">
                    <IconButton
                        onClick={this.props.openDetails}
                        style={styles.buttonClose}
                        iconStyle={styles.iconClose}
                        children={<Close />} // eslint-disable-line
                    />
                    <Col md={4} className="card-details-content">
                        <div className="card-details-body full-width">
                            <div className="align">
                                <img
                                    className="pokemon-details"
                                    alt="pokemon-details"
                                    src={currentPokemon.image}
                                />
                            </div>
                            <div className="card-details-title-wrapper text-center">
                                <span style={styles.pokemonName}>
                                    {currentPokemon.name}
                                </span>
                                <div className="align" style={{ marginBottom: "15px" }}>
                                    <div className="card-details-title-line" />
                                </div>
                            </div>
                            <div className="card-details-section bottom-line align">
                                <Col md={6} className="card-details-section-type text-center">
                                    {(currentPokemon.type
                                        .map(typeID => this.renderPokemonTypes(typeID)))}
                                    <span className="card-details-section-title">Type</span>
                                </Col>
                                <Col md={6} className="card-details-section-number left-line text-center">
                                    #{ZeroFill(3, currentPokemon.id_national)}
                                    <span className="card-details-section-title">No.</span>
                                </Col>
                            </div>
                            <Col md={12} className="card-details-section-description text-center bottom-line">
                                {currentPokemon.description}
                                <span className="card-details-section-title">Description</span>
                            </Col>
                            <Col md={12} className="bottom-line">
                                {this.renderPokemonDetailsEvolution()}
                                <span style={{ marginTop: 0 }} className="card-details-section-title text-center">Evolutions</span>
                            </Col>
                            {this.renderPokemonDetailsMap()}
                        </div>
                    </Col>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <Grid className="container full-height full-width" style={{ padding: 0 }}>
                <section className="index-wrapper full-height full-width">
                    <img src="img/pokemon-logo.png" className="index-logo" alt="poke-logo" />
                    {this.renderPokemonDetails()}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            zIndex: 10000,
                            opacity: 0.5,
                            margin: "15px",
                        }}
                    >
                        <IconButton
                            onTouchTap={
                                () => {
                                    this.props.resetSearchedPokemons();
                                    this.props.toggleView();
                                }
                            }
                            iconStyle={styles.icon}
                            tooltipPosition="top-center"
                            tooltip="Changer de vue"
                            children={<DashboardSVG/>} // eslint-disable-line
                        />
                        <IconButton
                            onTouchTap={
                                () => {
                                    if (Screenfull.enabled) {
                                        Screenfull.toggle();
                                    }
                                }
                            }
                            iconStyle={styles.icon}
                            tooltipPosition="top-center"
                            tooltip="Fullscreen"
                            children={<FullscreenSVG />} // eslint-disable-line
                        />
                    </div>
                    {this.renderOnToggleView()}
                    {this.renderSearchWrapper()}
                </section>
                <MapContainer />
            </Grid>
        );
    }
}

Home.propTypes = {
    toggleView: T.func.isRequired,
    openDetails: T.func.isRequired,
    resetSearchedPokemons: T.func.isRequired,
    openForm: T.func.isRequired,
    togglePlacingPokemon: T.func.isRequired,
    setSelectedPokemon: T.func.isRequired,
    setSelectedPokemonForDetails: T.func.isRequired,
    navbar: T.shape({
        showSearch: T.bool.isRequired,
    }).isRequired,
    home: T.shape({
        showCarousel: T.bool.isRequired,
    }).isRequired,
    pokemons: T.shape({
        isFetching: T.bool.isRequired,
        addingPokemonMarker: T.bool.isRequired,
        all: T.array,
        marked: T.array,
    }).isRequired,
    types: T.shape({
        all: T.array,
    }).isRequired,
    carousel: T.shape({
        selectedCurrent: T.shape({
            image: T.string,
            description: T.string,
            evolutions: T.array,
            id_parent: T.number,
            id_pokemon: T.number,
            id_national: T.number,
            type: T.array,
            name: T.string,
        }).isRequired,
        showDetails: T.bool.isRequired,
    }).isRequired,
};

export default Home;
