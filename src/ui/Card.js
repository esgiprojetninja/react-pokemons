import React from "react";
import { PropTypes as T } from "prop-types";

import IconButton from "material-ui/IconButton";
import LocationSVG from "material-ui/svg-icons/action/room";

const styles = {
    cardWrapper: {
        display: "flex",
        height: "433px",
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

/* eslint-disable */
export default class Card extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    
    render () {
        return (
            <div className="align" style={styles.cardWrapper}>
                <div className="card">
                    <span className="card-number">008</span>
                    <img src="img/reptincel.png" className="card-pokemon"/>
                    <IconButton
                    style={styles.cardIconLocationWrapper}
                    iconStyle={styles.cardIconLocation}
                    tooltipPosition="top-center"
                    tooltip="Position"
                    children={<LocationSVG/>}/>
                    <span className="card-title">Reptincel</span>
                    <span className="card-description">Reptincel est tiré du dinosaure, il possède de grandes et puissantes griffes acérées, qui laident notamment à déchirer la peau de ses ennemis.</span>
                    <div className="card-type align">
                        <img src="img/feu.png"/>
                    </div>
                </div>
            </div>
        )
    }
}
/* eslint-enable */
