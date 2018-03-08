import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import spacing from "material-ui/styles/spacing";
import injectTapEventPlugin from "react-tap-event-plugin";

import MainReducer from "./reducers/main";
import App from "./container/App";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    spacing,
    fontFamily: "Roboto, sans-serif",
    palette: {
    },
    appBar: {
    },
    button: {
    },
    icon: {
    },
});

const app = {
    startApp() {
        const store = createStore(
            MainReducer,
            applyMiddleware(thunk),
        );
        store.subscribe(() => {
            console.group();
            console.debug(store.getState());
            console.groupEnd();
        });

        render(
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Route path="/" component={App} />
                    </BrowserRouter>
                </Provider>
            </MuiThemeProvider>,
            document.getElementById("root"),
        );
    },
};

app.startApp();

export default app;
