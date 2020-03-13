import React, { Component } from 'react';

// COMPONENTS
import Header from "../header/Header";
import Footer from "../footer";

import "./layout.css";

class Layout extends Component {

    state = {
        showNav: false
    };

    toggleSidenav = (action) => {
        this.setState({
            showNav: action
        });
    };

    render() {
        return(
            <React.Fragment>
                <Header />
                {this.props.children}
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Layout;