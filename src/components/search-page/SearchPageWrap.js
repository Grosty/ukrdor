import SearchContext from "../app/SearchContext";
import React from "react";

const SearchPageWrap = (Component) => {
    return (props) => (
        <SearchContext.Consumer>
            {
                (value) => {
                    return (<Component {...props} value={value}/>);
                }
            }
        </SearchContext.Consumer>
    );
};

export default SearchPageWrap;