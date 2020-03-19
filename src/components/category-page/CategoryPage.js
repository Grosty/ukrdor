import React, {Component} from 'react';
import RoadApiService from "../../services/roadapi-service";
import RenderRoutesList from "../RenderRoutesList";

class CategoryPage extends Component {

    roadApiService = new RoadApiService();

    state= {
        routesList: [],
        nameCategory: '',

    };

    componentDidMount() {

        const {id} = this.props.match.params;

        this.roadApiService
            .getCategoryRoute(id)
            .then(({routesList, nameCategory})=>{
                this.setState({
                    routesList, nameCategory
                });
            });
    }

    // renderRoutesList(arr) {
    //     return arr.map(({id, name, sc})=>{
    //         return (
    //             <li key={id}>
    //                 <Link to={`/route/${id}`}>
    //                     <span>{sc} </span>
    //                     {name}
    //                     <i className="fas fa-arrow-circle-right"/>
    //                 </Link>
    //             </li>
    //         );
    //     });
    // }

    render() {

        const {nameCategory, routesList} = this.state;
        // const items = this.renderRoutesList(routesList);

        return (
            <div className="container homeItemWrap">
                <h3 style={ {fontSize: '1.5rem', marginBottom: '20px'} } >{nameCategory}</h3>
                <ul>
                    <RenderRoutesList>
                        {routesList}
                    </RenderRoutesList>
                </ul>
            </div>
        );
    }
}

export default CategoryPage;