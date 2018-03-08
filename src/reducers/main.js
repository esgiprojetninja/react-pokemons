import { combineReducers } from "redux";
import theme from "./theme";
import navbar from "./navbar";
import pokemons from "./pokemons";
import mapLegend from "./mapLegend";
import mapContainer from "./mapContainer";
import mapWrap from "./mapWrap";
import carousel from "./carousel";
import home from "./home";
import pokesearch from "./pokesearch";
import types from "./types";

const Main = combineReducers({
    navbar,
    theme,
    pokemons,
    mapWrap,
    mapLegend,
    mapContainer,
    carousel,
    home,
    pokesearch,
    types,
});

export default Main;
