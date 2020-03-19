import React from 'react';
import {Link} from "react-router-dom";

const RenderRoutesList = (props) => {

    const arr = props.children;

    return arr.map(({id, name, sc})=>{
        return (
            <li key={id}>
                <Link to={`/route/${id}`}>
                    <span style={{fontWeight: 'bold'}}>{sc} </span>
                    {name}
                    <i className="fas fa-arrow-circle-right"/>
                </Link>
            </li>
        );
    });
};

export default RenderRoutesList;