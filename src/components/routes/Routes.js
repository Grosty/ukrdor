import React from 'react';
import { Switch } from 'react-router-dom';
import { Route} from 'react-router-dom';

// COMPONENTS
import Home from "../home";
import Layout from "../layout";
import PublicRoute from "../public-route";
import CategoryPage from "../category-page";
import DetailsRoad from "../details-road";
import SearchPage from "../search-page";
import ProfilePage from "../ProfilePage";

const Routes = (props) => {

    return(

            <Layout user={props.user} lang={props.lang} logged={props.logged}
                    toggleLang={props.toggleLang}
                    toggleSearch={props.toggleSearch}>
                <Switch>
                    <PublicRoute {...props}
                                 restricted={false} path="/"
                                 exact component={Home}/>
                    <PublicRoute {...props}
                                 restricted={false}
                                 path="/categories/:id"
                                 exact
                                 component={CategoryPage}/>
                    <PublicRoute {...props}
                                 restricted={false}
                                 path="/route/:id" exact
                                 component={DetailsRoad}/>

                    <PublicRoute {...props}
                                 restricted={false}
                                 path='/route_search/:idUrl'
                                 exact
                                 component={SearchPage}/>
                    <PublicRoute {...props} path='/profile/' exact component={ProfilePage}/>
                    <Route path='/route_search/' render={()=> {return(<div className="container"><h3>Enter search input</h3></div>)}} />
                </Switch>
            </Layout>

    );
};

export default Routes;