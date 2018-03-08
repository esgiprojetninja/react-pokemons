import React from "react";
import { PropTypes as T } from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import Navbar from "../container/Navbar";
import Home from "../container/Home";

class App extends React.PureComponent {
    componentWillMount() {
        this.props.beforeReady(this.props.muiTheme);
    }
    componentDidMount() {
        this.props.onReady();
    }

    render() {
        return (
            <div className="full-height">
                <Navbar />
                <Home />
            </div>
        );
    }
}
App.propTypes = {
    beforeReady: T.func.isRequired,
    onReady: T.func.isRequired,
    muiTheme: T.shape({}).isRequired,
};


export default muiThemeable()(App);
