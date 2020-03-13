import React from 'react';
import { Route} from 'react-router-dom';

const PublicRoute = ({user, component: Comp, ...rest}) => {
    return(
        <Route {...rest} component={
            (props) => {
            return  <Comp {...props} user={user}/>
            }}/>
    )
};

export default PublicRoute;