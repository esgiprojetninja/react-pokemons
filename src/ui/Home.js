import React from "react";
import { PropTypes as T } from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import DashboardSVG from "material-ui/svg-icons/action/dashboard";
import IconButton from "material-ui/IconButton";
import FullscreenSVG from "material-ui/svg-icons/navigation/fullscreen";
import ArrowForwardSVG from "material-ui/svg-icons/navigation/arrow-forward";
import Screenfull from "screenfull";
import Close from "material-ui/svg-icons/action/highlight-off";
import ZeroFill from "zero-fill";
import TextField from "material-ui/TextField";
import DoneSVG from "material-ui/svg-icons/action/done";
import { cloneDeep } from "lodash";
import CircularProgress from "material-ui/CircularProgress";
import Carousel from "../container/Carousel";
import SubHome from "../container/SubHome";
import Table from "../container/Table";
import PokeSearch from "../container/PokeSearch";
import PokemonAPI from "../api/pokemon";

const pokeApi = new PokemonAPI();

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
        borderBottom: "none",
    },
    pokemonDescription: {
        fontSize: "12px",
        fontWeight: 400,
        borderBottom: "none",
    },
    pokemonId: {
        fontSize: "25px",
        marginTop: 0,
    },
    containerElement: {
        height: "80%",
        minWidth: "320px",
    },
    notTypedStyle: {
        opacity: 0.2,
    },
};

class Home extends React.PureComponent {
    async componentWillReceiveProps(props) {
        const poke = props.pokemons.all ?
            props.pokemons.all.find(p => p.id_national === props.carousel.selectedCurrent)
            || props.carousel.selectedCurrent :
            props.carousel.selectedCurrent;
        this.state = {
            currentDetailedPokemon: cloneDeep(poke),
            possibleParents: [],
        };

        // Trigger local request, not storing data in reducer
        if (this.state.currentDetailedPokemon && this.state.currentDetailedPokemon.id_national) {
            const res = await pokeApi
                .getPossibleParents(this.state.currentDetailedPokemon.id_national);
            if (!res.error) {
                this.setState({
                    possibleParents: res,
                });
            }
        }
    }

    propChangeHandler(prop, val) {
        this.setState({
            currentDetailedPokemon: {
                ...this.state.currentDetailedPokemon,
                [prop]: val,
            },
        });
    }

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

    renderPossibleParents() {
        // @TODO if user connected
        if (this.state.possibleParents && this.state.possibleParents.length) {
            return (
                <RaisedButton
                    target="_blank"
                    label="change parent"
                    labelColor="#ffffff"
                    secondary={true} // eslint-disable-line
                    style={{ alignSelf: "start" }}
                    buttonStyle={{ backgroundColor: "#a4c639" }}
                    // onTouchTap={}
                />
            );
        }
        return null;
    }

    renderPokemonDetailsEvolution() {
        return (
            <div className="align">
                {this.renderPossibleParents()}
                {this.renderPokemonDetailsFirstStarter()}
                {this.renderPokemonDetailsCurrent()}
                {this.renderPokemonDetailsFirstEvolution()}
            </div>
        );
    }

    renderPokemonTypes(typeObj) {
        // @TODO if user connected
        const isTypeInCurrentPokemon = !!this.state.currentDetailedPokemon.type
            .find(typeID => typeID === typeObj.id);
        const dynamicStyle = isTypeInCurrentPokemon ? {
            display: "initial",
            cursor: "pointer",
        } : {
            display: "initial",
            cursor: "pointer",
            ...styles.notTypedStyle,
        };

        return (
            <div
                key={typeObj.id}
                className="card-type card-type-size"
                onTouchTap={() => {
                    this.setState({
                        currentDetailedPokemon: {
                            ...this.state.currentDetailedPokemon,
                            type: isTypeInCurrentPokemon ?
                                this.state.currentDetailedPokemon.type
                                    .filter(typeID => typeID !== typeObj.id)
                                :
                                this.state.currentDetailedPokemon.type
                                    .concat([typeObj.id]).reverse().slice(0, 2),
                        },
                    });
                }}
                style={dynamicStyle}
            >
                <span className="type" style={{ background: typeObj.color }}>{typeObj.title}</span>
            </div>
        );
    }

    renderSaveBtns() {
        // @TODO protect on user connected
        if (this.props.pokemons.isFetching) {
            return (
                <Col
                    md={12}
                    className="text-center absolute full-width full-height display-flex-row justify-end"
                    style={{
                        top: 0,
                        height: "20%",
                        maxHeight: "75px",
                    }}
                >
                    <CircularProgress size={10} thickness={5} />
                </Col>
            );
        }
        return (
            <Col
                md={12}
                className="text-center absolute full-width full-height display-flex-row justify-end"
                style={{
                    top: 0,
                    height: "20%",
                    maxHeight: "75px",
                }}
            >
                <RaisedButton
                    target="_blank"
                    label=""
                    labelColor="#ffffff"
                    secondary={true} // eslint-disable-line
                    style={{ alignSelf: "start" }}
                    buttonStyle={{ backgroundColor: "#a4c639" }}
                    icon={<DoneSVG />}
                    onTouchTap={
                        () => {
                            this.props.openDetails();
                            this.props.updatePokemon(this.state.currentDetailedPokemon);
                        }
                    }
                />
            </Col>
        );
    }

    renderPokemonDetailsName() {
        // @TODO : if (this.user.isConnected)
        return (
            <TextField
                value={this.state.currentDetailedPokemon.name}
                style={styles.pokemonName}
                inputProps={styles.pokemonName}
                underlineShow={false}
                onChange={(event) => { this.propChangeHandler("name", event.target.value); }}
            />
        );
        // <span style={styles.pokemonName}>
        //     {currentPokemon.name}
        // </span>
    }

    renderPokemonDetailsDescription() {
        // @TODO : if (this.user.isConnected)
        return (
            <div
                className="full-width"
                style={{
                    maxWidth: "380px",
                    margin: "auto",
                }}
            >
                <TextField
                    value={this.state.currentDetailedPokemon.description}
                    style={styles.pokemonDescription}
                    floatingLabelText="Description"
                    multiLine={true} // eslint-disable-line
                    fullWidth={true} // eslint-disable-line
                    floatingLabelFixed={true} // eslint-disable-line
                    underlineShow={false}
                    floatingLabelStyle={{
                        fontSize: "18px",
                        fontWeight: 800,
                        left: 0,
                        textAlign: "left",
                        color: "#a4c639",
                    }}
                    rows={4}
                    rowsMax={6}
                    onChange={(event) => { this.propChangeHandler("description", event.target.value); }}
                />
            </div>
        );
        // {currentPokemon.description}
        // <span className="card-details-section-title">Description</span>
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
                        <div className="card-details-body full-width full-height relative">
                            <div className="align">
                                <img
                                    className="pokemon-details"
                                    alt="pokemon-details"
                                    src={currentPokemon.image}
                                />
                            </div>
                            <div className="card-details-title-wrapper text-center">
                                {this.renderPokemonDetailsName(currentPokemon)}
                                <div className="align" style={{ marginBottom: "15px" }}>
                                    <div className="card-details-title-line" />
                                </div>
                            </div>
                            <div className="card-details-section bottom-line align">
                                <Col md={6} className="card-details-section-type text-center display-flex-row">
                                    {(this.props.types.all
                                        .map(typeObj => this.renderPokemonTypes(typeObj)))}
                                </Col>
                                <Col md={6} className="card-details-section-number left-line text-center">
                                    #{ZeroFill(3, currentPokemon.id_national)}
                                    <span className="card-details-section-title">No.</span>
                                </Col>
                            </div>
                            <Col md={12} className="card-details-section-description text-center bottom-line">
                                {this.renderPokemonDetailsDescription()}
                            </Col>
                            <Col md={12} className="bottom-line">
                                {this.renderPokemonDetailsEvolution()}
                                <span style={{ marginTop: 0 }} className="card-details-section-title text-center">Evolutions</span>
                            </Col>
                            {this.renderSaveBtns()}
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
            </Grid>
        );
    }
}

Home.propTypes = {
    toggleView: T.func.isRequired,
    updatePokemon: T.func.isRequired,
    openDetails: T.func.isRequired,
    resetSearchedPokemons: T.func.isRequired,
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
