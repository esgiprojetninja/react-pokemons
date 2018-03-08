import React from "react";
import { PropTypes as T } from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import LocationSVG from "material-ui/svg-icons/action/room";
import AddCircleOutlineSVG from "material-ui/svg-icons/content/add-circle-outline";
import scrollToElement from "scroll-to-element";

const styles = {
    button: {
        margin: 12,
        width: "auto",
    },
};

export default class SubHome extends React.PureComponent {
    /* eslint-disable */
    renderSubTitle() {
        return (
            <div>
                <span className="title-lg">Le pokedex</span>
                <span className="title-lg">le plus complet</span>
                <span className="title-lg">et le plus rapide</span>
            </div>
        )
    }
    /* eslint-enable */

    renderSubtitleBtn() {
        return (
            <div className="text-center title-btn-wrapper">
                <RaisedButton
                    target="_blank"
                    label="Ajouter un pokémon"
                    labelColor="#ffffff"
                    backgroundColor="#a4c639"
                    style={styles.button}
                    icon={<AddCircleOutlineSVG />}
                />
                <RaisedButton
                    target="_blank"
                    label="Voir la map"
                    labelColor="#ffffff"
                    secondary={true} // eslint-disable-line
                    buttonStyle={{ backgroundColor: this.props.theme.current.palette.primary1Color }} // eslint-disable-line
                    style={styles.button}
                    icon={<LocationSVG />}
                    onTouchTap={
                        () => {
                            scrollToElement(".map-wrapper");
                        }
                    }
                />
            </div>
        );
    }

    render() {
        return (
            <div className="align full-height">
                <div className="subtitle-wrapper">
                    {this.renderSubTitle()}
                    {this.renderSubtitleBtn()}
                </div>
                <div className="full-height align">
                    <img className="random-btn-image" src="img/randomBtn.png" alt="chibar" />
                </div>
            </div>
        );
    }
}

SubHome.propTypes = {
    theme: T.shape({
        current: T.shape({
            palette: T.shape({
                accent1Color: T.string.isRequired,
                textColor: T.string.isRequired,
                primary1Color: T.string.isRequired,
                primary2Color: T.string.isRequired,
                primary3Color: T.string.isRequired,
            }),
        }),
    }).isRequired,
};
