import React from "react";
import { PropTypes as T } from "prop-types";
import Slider from "react-slick";
import IconButton from "material-ui/IconButton";
import DescriptionSVG from "material-ui/svg-icons/action/description";
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

const renderType = (ps, ks) => (
    (<span key={ks} className="type" style={{ backgroundColor: ps.color }}>{ps.nom_type}</span>)
);

class Carousel extends React.PureComponent {
    /* eslint-disable */
    constructor(props) {
        super(props);
    }
    /* eslint-enable */

    renderCards(p, key) {
        return (
            <div key={key} className="align" style={styles.cardWrapper}>
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
                        {(this.props.pokemons.all[key].type.map((ps, ks) => renderType(ps, ks)))}
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
                Loading...
            </div>
        );
    }
}
Carousel.propTypes = {
    setSelectedPokemonForDetails: T.func.isRequired,
    openDetails: T.func.isRequired,
    tickMarkers: T.func.isRequired,
    validateAddedMarker: T.func.isRequired,
    setNoticedAddingPokeLocationMsgTrue: T.func.isRequired,
    setNoticedAddingPokeLocationMsgFalse: T.func.isRequired,
    setNoticedFailedAddEDPokeLocationMsgTrue: T.func.isRequired,
    setNoticedFailedAddEDPokeLocationMsgFalse: T.func.isRequired,
    pokemons: T.shape({
        isFetching: T.bool.isRequired,
        all: T.array.isRequired,
    }).isRequired,
    theme: T.shape({}).isRequired,
    mapLegend: T.shape({
        placingPokemon: T.bool.isRequired,
        selectedPokemon: T.shape({}),
    }).isRequired,
};

export default Carousel;
