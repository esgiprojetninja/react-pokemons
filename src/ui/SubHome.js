import React from "react";
import { PropTypes as T } from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import AddCircleOutlineSVG from "material-ui/svg-icons/content/add-circle-outline";

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
            <div className="full-width">
                <p className="title-lg">Le pokedex</p>
                <p className="title-lg">le plus complet</p>
                <p className="title-lg">et le plus rapide</p>
            </div>
        )
    }
    /* eslint-enable */

    render() {
        return (
            <div className="display-flex-row justify-center full-height">
                <div className="subtitle-wrapper align-start full-height" style={{ marginTop: "31px" }}>
                    {this.renderSubTitle()}
                    <div className="text-center title-btn-wrapper">
                        <RaisedButton
                            target="_blank"
                            label="Ajouter un pokémon"
                            labelColor="#ffffff"
                            backgroundColor="#a4c639"
                            style={styles.button}
                            icon={<AddCircleOutlineSVG />}
                        />
                    </div>
                </div>
                <div className="full-height align">
                    <img className="random-btn-image" src="img/randomBtn.png" alt="chibar" />
                </div>
            </div>
        );
    }
}

SubHome.propTypes = {
};
