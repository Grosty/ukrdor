import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";

import './app.css';
import Routes from "../routes";


class App extends Component {

    state = {
        user: null,
        lang: 'uk'
    };

    toggleLang = (lang) => {
        this.setState({
            lang: lang
        });
    };

    render() {
        return (
            <BrowserRouter >
                <Routes {...this.state} toggleLang={this.toggleLang}/>
            </BrowserRouter>
        );
    }

}

export default App;