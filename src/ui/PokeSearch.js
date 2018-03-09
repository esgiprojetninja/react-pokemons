import React from "react";
import { PropTypes as T } from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import IconButton from "material-ui/IconButton";
import Close from "material-ui/svg-icons/action/highlight-off";
import Checkbox from "material-ui/Checkbox";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import StringSimilarity from "string-similarity";
import RaisedButton from "material-ui/RaisedButton";

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
        this.state = {
            searchedName: "",
            searchedTypes: [],
        };
    }

    filterByName() {
        return this.props.pokemons.all
            .filter(pokemon => StringSimilarity
                .compareTwoStrings(pokemon.name, this.state.searchedName) > 0.5);
    }

    filterByTypes() {
        const matchedPokemons = [];
        this.props.pokemons.all.forEach((poke) => {
            if (!poke.type) return;
            if (this.state.searchedTypes.indexOf(poke.type[0]) > -1) {
                matchedPokemons.push(poke);
                return;
            }
            if (!poke.type.length < 2) return;
            if (this.state.searchedTypes.indexOf(poke.type[1]) > -1) {
                matchedPokemons.push(poke);
            }
        });
        return matchedPokemons;
    }

    checkTypeHandler = (pokeType, event, isInputChecked) => {
        if (isInputChecked) {
            if (this.props.pokesearch.searchedParams.pokemonType
                .indexOf(pokeType.title) === -1) {
                this.props.setSearchedType(pokeType.title);
            }
            this.setState({
                searchedTypes: this.state.searchedTypes.concat([pokeType.id]),
            });
        } else {
            this.props.removeSearchedParamsType(pokeType.title);
            this.setState({
                searchedTypes: this.state.searchedTypes.filter(typeId => typeId !== pokeType.id),
            });
        }
        const matchedPokemons = this.filterByTypes().concat(this.filterByName());
        this.props.setSearchedPokemons(matchedPokemons);
    }

    renderTypes(pokeType, thisK) {
        return (
            <div className="search-checkbox-wrapper" key={thisK}>
                <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder style={{ fill: "white" }} />}
                    label={pokeType.title}
                    labelStyle={{
                        backgroundColor: pokeType.color,
                        width: "auto",
                        color: "white",
                        borderBottomLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        fontSize: "11px",
                        minWidth: "80px",
                        textAlign: "center",
                    }}
                    onCheck={(event, isInputChecked) => { this.checkTypeHandler(pokeType, event, isInputChecked); }}
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
                                        this.setState({
                                            searchedName: event.target.value,
                                        });
                                    } else {
                                        this.props.resetSearchedParams();
                                    }
                                    const matchedPokemons = this.filterByTypes().concat(this.filterByName());
                                    this.props.setSearchedPokemons(matchedPokemons);
                                }}
                                className="search-input"
                                type="text"
                                placeholder="Rechercher"
                            />
                            <div className="filters filters-type">
                                <span className="filters-name">Types :</span>
                                {
                                    (this.props.types.all ?
                                        this.props.types.all
                                            .map((pokeType, thisKey) =>
                                                this.renderTypes(pokeType, thisKey))
                                        : [])
                                }
                            </div>
                            <div>
                                <RaisedButton
                                    target="_blank"
                                    label="Go!"
                                    style={{ margin: "15px" }}
                                    labelColor="#ffffff"
                                    onTouchTap={() => {
                                        const matchedPokemons = this.filterByTypes().concat(this.filterByName());
                                        this.props.setSearchedPokemons(matchedPokemons);
                                        this.props.closeSearch();
                                    }}
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
            query: T.any,
        }),
    }).isRequired,
    types: T.shape({
        all: T.array,
    }).isRequired,
    pokemons: T.shape({
        all: T.array.isRequired,
    }).isRequired,
};
export default PokeSearch;
