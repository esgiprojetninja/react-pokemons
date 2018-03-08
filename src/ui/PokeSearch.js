import React from "react";
import { PropTypes as T } from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import IconButton from "material-ui/IconButton";
import Close from "material-ui/svg-icons/action/highlight-off";
import Checkbox from "material-ui/Checkbox";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import TextField from "material-ui/TextField";
import StringSimilarity from "string-similarity";
import RaisedButton from "material-ui/RaisedButton";
import Swal from "sweetalert";

const colors = [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Black",
    "White",
];

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
    checkbox: {
        color: "white",
        width: "auto",
    },
    checkboxLabel: {
        color: "white",
        width: "auto",
    },
    checkboxIcon: {
        color: "white",
    },
};

class PokeSearch extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    getPokemonsByQuery = (arr, pokemonName) => (
        arr.filter(pokemon => StringSimilarity
            .compareTwoStrings(pokemon.name, pokemonName) > 0.5)
    );

    getPokemonsByFilter = (arr) => {
        const pokemonsByFilter = [];
        arr.forEach((pokemon) => {
            if (pokemon.type) {
                pokemon.type.forEach((pokemonType) => {
                    if (this.props.pokesearch.searchedParams.pokemonType.length !== 0) {
                        this.props.pokesearch.searchedParams.pokemonType
                            .forEach((searchedParamsType) => {
                                if (pokemonType.nom_type === searchedParamsType
                                    && pokemonsByFilter.indexOf(pokemon) === -1) {
                                    pokemonsByFilter.push(pokemon);
                                }
                            });
                    }
                });
            }
        });
        return pokemonsByFilter;
    }

    renderTypes(thisP, thisK) {
        return (
            <div className="search-checkbox-wrapper" key={thisK}>
                <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder style={{ fill: "white" }} />}
                    label={thisP.name_type}
                    labelStyle={{
                        backgroundColor: thisP.color,
                        width: "auto",
                        color: "white",
                        borderBottomLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        fontSize: "11px",
                        minWidth: "80px",
                        textAlign: "center",
                    }}
                    onCheck={
                        (event, isInputChecked) => {
                            if (isInputChecked) {
                                if (this.props.pokesearch.searchedParams.pokemonType
                                    .indexOf(thisP.name_type) === -1) {
                                    this.props.setSearchedType(thisP.name_type);
                                }
                            } else {
                                this.props.removeSearchedParamsType(thisP.name_type);
                            }
                        }
                    }
                    iconStyle={styles.checkboxIcon}
                    style={styles.checkbox}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="search-fixed">
                <IconButton
                    onClick={this.props.toggleSearch}
                    style={styles.buttonClose}
                    iconStyle={styles.iconClose}
                    children={<Close/>} // eslint-disable-line
                />
                <Grid>
                    <Row>
                        <Col md={12} className="search-content">
                            <div className="search-intro">Tape le nom d&#39;un Pokémon et clique sur Go!</div>
                            <input
                                onChange={(event) => {
                                    if (event.target.value) {
                                        this.props.setSearchedQuery(event.target.value);
                                    } else {
                                        this.props.resetSearchedParams();
                                    }
                                }}
                                className="search-input"
                                type="text"
                                placeholder="Rechercher"
                            />
                            <div className="filters filters-type">
                                <span className="filters-name">Types :</span>
                                {
                                    (this.props.types.all
                                        .map((thisP, thisKey) => this.renderTypes(thisP, thisKey)))
                                }
                            </div>
                            <div>
                                <RaisedButton
                                    target="_blank"
                                    label="Go!"
                                    style={{ margin: "15px" }}
                                    labelColor="#ffffff"
                                    onTouchTap={
                                        () => {
                                            if (this.props.pokesearch.searchedParams.pokemonType
                                                && this.props
                                                    .pokesearch.searchedParams.query === null) {
                                                this.props.setSearchedPokemons(this.getPokemonsByFilter(this.props.pokemons.all)); // eslint-disable-line
                                            }

                                            if (this.props.pokesearch.searchedParams.pokemonType
                                                .length === 0
                                                && this.props.pokesearch.searchedParams.query) {
                                                this.props.setSearchedPokemons(this.getPokemonsByQuery(this.props.pokemons.all, this.props.pokesearch.searchedParams.query)); // eslint-disable-line
                                            }

                                            if (this.props.pokesearch.searchedParams.pokemonType
                                                .length !== 0
                                                && this.props.pokesearch.searchedParams.query) {
                                                this.props.setSearchedPokemons(this.getPokemonsByFilter(this.getPokemonsByQuery(this.props.pokemons.all, this.props.pokesearch.searchedParams.query))); // eslint-disable-line
                                            }
                                            if (this.props.pokesearch.searchedParams.pokemonType
                                                .length === 0
                                                && this.props.pokesearch.searchedParams
                                                    .query === null) {
                                                Swal("Oops...", "Vous n'avez rien renseigné dans la recherche!", "error");
                                            } else {
                                                this.props.closeSearch();
                                            }
                                        }
                                    }
                                    backgroundColor="#a4c639"
                                />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


PokeSearch.propTypes = {
    setSearchedQuery: T.func.isRequired,
    setSearchedType: T.func.isRequired,
    resetSearchedParams: T.func.isRequired,
    removeSearchedParamsType: T.func.isRequired,
    setSearchedPokemons: T.func.isRequired,
    closeSearch: T.func.isRequired,
    toggleSearch: T.func.isRequired,
    pokesearch: T.shape({
        searchedParams: T.shape({
            pokemonType: T.array.isRequired,
            query: T.any.isRequired,
        }),
    }).isRequired,
    types: T.shape({
        all: T.array.isRequired,
    }).isRequired,
    pokemons: T.shape({
        all: T.array.isRequired,
    }).isRequired,
};
export default PokeSearch;
