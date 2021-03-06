import React from 'react';
import { Route} from 'react-router-dom';

const PublicRoute = ({user, logged, lang, component: Comp, ...rest}) => {
    return(
        <Route {...rest} component={
            (props) => {
            return  <Comp {...props} user={user} lang={lang} logged={logged}/>
            }}/>
    )
};

export default PublicRoute;