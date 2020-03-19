import React, {Component} from 'react';
import {Link} from "react-router-dom";


class HeaderSearch extends Component {

    state = {
        searchInput: '',
    };



    render() {

        return (
            <div className="headerSearch">
                <input id='searchPanelInput' type="text" onChange={(e)=>{
                    this.setState({searchInput: e.target.value.toUpperCase()});
                }}/>
                <Link onClick={()=>{
                    this.props.toggleSearch(this.state.searchInput);
                    document.getElementById('searchPanelInput').value = '';
                }} to={`/route_search/${this.state.searchInput}`}>Search</Link>
            </div>
        );
    }
}

export default HeaderSearch;