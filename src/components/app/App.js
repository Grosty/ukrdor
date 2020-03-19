import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import SearchContext from "./SearchContext";

import './app.css';
import Routes from "../routes";




class App extends Component {

    state = {
        user: null,
        lang: 'uk',
        searchInput: 'M-01',
    };

    toggleLang = (lang) => {
        this.setState({
            lang: lang
        });
    };

    toggleSearch = (searchInput) => {
        this.setState({searchInput});
    };

    render() {

        return (
            <SearchContext.Provider value={this.state.searchInput}>
                <BrowserRouter >
                    <Routes {...this.state} toggleLang={this.toggleLang} toggleSearch={this.toggleSearch}/>
                </BrowserRouter>
            </SearchContext.Provider>

        );
    }

}

export default App;