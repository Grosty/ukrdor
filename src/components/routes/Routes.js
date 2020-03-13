import React from 'react';
import { Switch } from 'react-router-dom';

// COMPONENTS
import Home from "../home";
import Layout from "../layout";
import PublicRoute from "../public-route";
import CategoryPage from "../category-page";
import DetailsRoad from "../details-road";

const Routes = (props) => {
    return(
        <Layout user={props.user}>
            <Switch>
                <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
                <PublicRoute {...props} restricted={false} path="/categories/:id" exact component={CategoryPage}/>
                <PublicRoute {...props} restricted={false} path="/route/:id" exact component={DetailsRoad}/>
            </Switch>
        </Layout>
    );
};

export default Routes;