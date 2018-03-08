import React from "react";
import { PropTypes as T } from "prop-types";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import MapSVG from "material-ui/svg-icons/maps/place";
import AddOnMapSVG from "material-ui/svg-icons/maps/add-location";
import BackSVG from "material-ui/svg-icons/navigation/arrow-back";
import CancelSVG from "material-ui/svg-icons/navigation/cancel";

const styles = {
    container: {
        padding: "20px",
        borderRadius: "10px",
        transition: "all .2s ease-in-out",
    },
    icon: {
        height: "45px",
        width: "45px",
    },
    el: {
        margin: "20px 0 0 20px",
    },
    btn: {
        marginTop: "20px",
        marginLeft: "20px",
    },
};

export default class MapLegend extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleReturn = () => {
        this.props.toggleForm();
        this.props.cleanMarker(this.props.mapWrap.addedMarker);
    }
    handleCancel = () => {
        this.props.togglePlacingPokemon();
        this.props.cleanMarker(this.props.mapWrap.addedMarker);
    }

    handlePokemonSelection = (event, index, value) => {
        this.props.setSelectedPokemon(this.props.pokemons.all
            .find(poke => poke.id_national === value));
    }

    renderPokemonList() {
        return this.props.pokemons.all.map((pokemon, key) =>
            (<MenuItem
                value={pokemon.id_national}
                primaryText={
                    `${pokemon.id_national} - ${pokemon.name}`
                }
                key
            />));
    }

    renderForm() {
        return (
            <div className="full-width height-auto margin-auto display-flex-column">
                <SelectField
                    floatingLabelText="Pokemon aperçu"
                    value={this.props.mapLegend.selectedPokemon.id_national || null}
                    onChange={this.handlePokemonSelection}
                    menuItemStyle={{ color: this.props.theme.current.palette.primary1Color }}
                    selectedMenuItemStyle={{ color: this.props.theme.current.palette.accent1Color }}
                    maxHeight={250}
                >
                    <MenuItem value={null} primaryText="" />
                    {this.renderPokemonList()}
                </SelectField>
                <div className="display-flex-row margin-auto">
                    <RaisedButton
                        label="retour"
                        secondary={true} // eslint-disable-line
                        icon={<BackSVG />}
                        onTouchTap={this.handleReturn}
                    />
                    <RaisedButton
                        label={this.props.mapLegend.placingPokemon ? "annuler" : "localiser"}
                        primary={true} // eslint-disable-line
                        icon={this.props.mapLegend.placingPokemon ? <CancelSVG /> : <AddOnMapSVG />}
                        disabled={this.props.mapLegend.selectedPokemon.id_national === undefined}
                        onTouchTap={this.handleCancel}
                    />
                </div>
            </div>
        );
    }

    renderDescription() {
        return (
            <div className="full-width height-auto margin-auto display-flex-column">
                <p
                    style={{
                        ...styles.el,
                        color: this.props.theme.current.palette.textColor,
                    }}
                >
                    Regarde les Pokémons aux alentours
                    et si tu n&#39;en trouves pas, utilise la Recherche !
                </p>
                <RaisedButton
                    label="ajouter un pokémon"
                    primary={true} // eslint-disable-line
                    className="align-start"
                    style={{
                        ...styles.btn,
                        background: this.props.theme.current.palette.primary3Color,
                        color: this.props.theme.current.palette.textColor,
                    }}
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                    onTouchTap={this.props.toggleForm}
                />
            </div>
        );
    }

    renderContent() {
        return this.props.mapLegend.displayForm ?
            this.renderForm() :
            this.renderDescription();
    }

    render() {
        return (
            <div
                style={{
                    ...styles.container,
                    background: this.props.theme.current.palette.primary2Color,
                }}
                className="width-8 margin-auto display-flex-column justify-start"
            >
                <div className="margin-reset width-auto display-flex-row align-start">
                    <MapSVG
                        style={styles.icon}
                        color={this.props.theme.current.palette.textColor}
                    />
                    <h3 style={{ color: this.props.theme.current.palette.textColor }} className="uppercase header-title">map</h3>
                </div>
                {this.renderContent()}
            </div>
        );
    }
}
MapLegend.propTypes = {
    toggleForm: T.func.isRequired,
    setSelectedPokemon: T.func.isRequired,
    togglePlacingPokemon: T.func.isRequired,
    cleanMarker: T.func.isRequired,
    theme: T.shape({
        current: T.shape({
            palette: T.shape({
                accent1Color: T.string.isRequired,
                textColor: T.string.isRequired,
                primary1Color: T.string.isRequired,
                primary2Color: T.string.isRequired,
                primary3Color: T.string.isRequired,
            }),
        }).isRequired,
    }).isRequired,
    mapLegend: T.shape({
        displayForm: T.bool.isRequired,
        placingPokemon: T.bool.isRequired,
        selectedPokemon: T.shape({
            id_national: T.any.isRequired,
        }),
    }).isRequired,
    mapWrap: T.shape({
        addedMarker: T.any.isRequired,
    }).isRequired,
    pokemons: T.shape({
        isFetching: T.bool.isRequired,
        addingPokemonMarker: T.bool.isRequired,
        marked: T.array.isRequired,
        all: T.array.isRequired,
    }).isRequired,
};
