import React from 'react';
import {BrowserRouter} from "react-router-dom";

import './app.css';
import Routes from "../routes";


const App = (props) => {

        return (
            <BrowserRouter >
                <Routes {...props}/>
            </BrowserRouter>
        );

};

export default App;