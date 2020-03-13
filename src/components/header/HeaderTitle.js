import React from "react";
import mainLogo from '../../img/logoKM.png'
import {Link} from "react-router-dom";

const HeaderTitle = () => {
    return (
        <Link to='/' className="headerLink">
            <div className="title-logo-wrap">
            <span className="logo-wrap">
                <img src={mainLogo} alt="logo"/>
            </span>
                <span>ДП "ДерждорНДІ"</span>
            </div>
        </Link>
    );
};

export default HeaderTitle;