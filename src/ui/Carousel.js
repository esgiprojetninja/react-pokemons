import React from "react";
import { PropTypes as T } from "prop-types";
import Slider from "react-slick";
import IconButton from "material-ui/IconButton";
import DescriptionSVG from "material-ui/svg-icons/action/description";
import CircularProgress from "material-ui/CircularProgress";
import ZeroFill from "zero-fill";

const styles = {
    cardWrapper: {
        display: "flex",
    },
    cardIconLocationWrapper: {
        width: "25px",
        height: "25px",
        position: "absolute",
        right: "0",
        top: "0",
        padding: "3px",
    },
    cardIconLocation: {
        width: "20px",
        height: "20px",
        color: "white",
    },
};

const sliderSettings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 1,
            },
        },
    ],
};

const usedKeys = [];

class Carousel extends React.PureComponent {
    renderType(typeID) {
        if (!this.props.types.all) return null;
        const type = this.props.types.all.find(t => t.id === typeID);
        if (!type) return null;
        return (
            <span key={type.id} className="type" style={{ backgroundColor: type.color }}>{type.title}</span>
        );
    }

    renderCards(p, key) {
        usedKeys.push(p);
        return (
            <div key={p.id} className="align" style={styles.cardWrapper}>
                <div className="card">
                    <span className="card-number">#{ZeroFill(3, this.props.pokemons.all[key].id_national)}</span>
                    <img
                        src={this.props.pokemons.all[key].image}
                        alt="chepa"
                        className="card-pokemon"
                    />
                    <IconButton
                        style={styles.cardIconLocationWrapper}
                        iconStyle={styles.cardIconLocation}
                        tooltipPosition="top-center"
                        tooltip="Détails"
                        children={<DescriptionSVG/>} // eslint-disable-line
                        onTouchTap={() => {
                            this.props.setSelectedPokemonForDetails(this.props.pokemons.all[key]);
                            this.props.openDetails();
                        }}
                    />
                    <span className="card-title">{this.props.pokemons.all[key].name}</span>
                    <span className="card-description">{this.props.pokemons.all[key].description}</span>
                    <div className="card-type align">
                        {(this.props.pokemons.all[key].type.map(typeID => this.renderType(typeID)))}
                    </div>
                </div>
            </div>
        );
    }


    render() {
        if (this.props.pokemons.all) {
            return (
                <div className="card-wrapper">
                    <Slider {...sliderSettings}>
                        {(this.props.pokemons.all.map((p, key) => this.renderCards(p, key)))}
                    </Slider>
                </div>
            );
        }
        return (
            <div className="align full-height" style={{ height: "49vh" }}>
                <CircularProgress size={150} thickness={10} />
            </div>
        );
    }
}
Carousel.propTypes = {
    setSelectedPokemonForDetails: T.func.isRequired,
    openDetails: T.func.isRequired,
    pokemons: T.shape({
        isFetching: T.bool.isRequired,
        all: T.array,
    }).isRequired,
    types: T.shape({
        all: T.array,
    }).isRequired,
    theme: T.shape({}).isRequired,
    mapLegend: T.shape({
        placingPokemon: T.bool.isRequired,
        selectedPokemon: T.shape({}),
    }).isRequired,
};

export default Carousel;
