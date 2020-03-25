import React, { Component } from 'react';

// COMPONENTS
import Header from "../header/Header";
import Footer from "../footer";

import "./layout.css";
import ErrorBoundary from "../ErrorBoundary";

class Layout extends Component {

    state = {
        showNav: false,
        lang: this.props.lang,
    };

    toggleSidenav = (action) => {
        this.setState({
            showNav: action
        });
    };

    render() {
        return(
            <React.Fragment>
                <Header {...this.state} {...this.props} />
                    <ErrorBoundary>
                        {this.props.children}
                    </ErrorBoundary>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Layout;