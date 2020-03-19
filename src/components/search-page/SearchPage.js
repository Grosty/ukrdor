import React, {Component} from 'react';
import RoadApiService from "../../services/roadapi-service";
import SearchPageWrap from "./SearchPageWrap";
import RenderRoutesList from "../RenderRoutesList";

class SearchPage extends Component {

    state = {
        searchInput: this.props.value,
        data: [],
    };

    roadApiService = new RoadApiService(this.props.lang);

    componentDidMount() {
        this.getUpdate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getUpdate() {
        this.roadApiService
            .getSearchInput(this.props.value)
            .then(({data}) => {
                this.setState({
                        data,
                    }
                );
            });
    }


    render() {

        return (

            <div  className="container homeItemWrap">
                <h3>Резултат поиска по запросу: {this.props.value}</h3>
                <p>Совпадений: {this.state.data.length}</p>
                <ul>
                    <RenderRoutesList >
                        {this.state.data}
                    </RenderRoutesList>
                </ul>
            </div>

        );
    }
}


export default SearchPageWrap(SearchPage);