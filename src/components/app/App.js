import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import SearchContext from "./SearchContext";

import './app.css';
import Routes from "../routes";
import GetUser from "../../services/getUser";

// let userData = {
//     "logged": true,
//     "data": {
//         "id": 2,
//         "last_login": "2020-03-19 15:03",
//         "is_superuser": false,
//         "email": "grostmaster@gmail.com",
//         "is_staff": false,
//         "is_active": true,
//         "other2": "",
//         "fname": "Oleh",
//         "lname": "Butsyk",
//         "phone": "",
//         "country": "ua",
//         "region": "",
//         "join": "2020-03-19 15:03",
//         "safe": false,
//         "real_private_key": "",
//         "apikey": "ca425e92-153a-45d9-8ba2-2b7f342303f9",
//         "remind_newroute": true
//     }
// };


class App extends Component {
    _isMounted = false;

    state = {
        isLoading: true,
        user: null,
        logged: false,
        lang: 'uk',
        searchInput: '',
    };

    getUser = new GetUser();

    componentDidMount() {
        this._isMounted = true;

        this.getUser
            .getUser()
            .then(({user = null, logged = false}) => {
                if (this._isMounted){
                    this.setState({
                        user,
                        logged,
                        isLoading: false
                    });
                }
            });

        // if(this._isMounted){
        //     this.setState({
        //             logged: userData.logged,
        //             isLoading: false
        //         }
        //     );
        // }



    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleLang = (lang) => {
        this.setState({
            lang: lang
        });
    };

    toggleSearch = (searchInput) => {
        this.setState({searchInput});
    };

    render() {
        // console.log(this.state);

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