import React from 'react';
import './header.css';
import '@fortawesome/fontawesome-free/css/all.css'
import HeaderTitle from "./HeaderTitle";

const Header = (props) => {

    return (
        <header className="header container">
            <HeaderTitle/>
            <button onClick={()=>{props.toggleLang('uk')}}>Ua lang</button>
            <button onClick={()=>{props.toggleLang('en')}}>En lang</button>
            <div className="icons-wrap">
                <a href="https://www.facebook.com/KmplusUkraine/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-square"/>
                </a>
                <a href="mailto:info@kmplus.org.ua" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-at"/>
                </a>

            </div>

        </header>
    );
};

export default Header;