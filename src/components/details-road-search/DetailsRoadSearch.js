import React, {Component} from 'react';
import RoadApiService from "../../services/roadapi-service";

class DetailsRoadSearch extends Component {

    state = {
        status: false,
        id: this.props.id,
        language: this.props.lang,
        userCoords: this.props.userCoords, /* '30.73839863,50.4897829'*/
        userKmSearch: this.props.userKmSearch,
        detail: [],
        error: false,

    };

    roadApiService = new RoadApiService(this.state.language);

    getUpdate () {
        // const {userCoords} = this.props;
        const searchInput = this.props.userKmSearch || this.props.userCoords;
        const {userCoords, userKmSearch} = this.props;


        if(this.props.userKmSearch) {
            this.roadApiService
                .getUserKmPlus(this.props.userKmSearch, this.state.id)
                .then(({detail, status}) => {
                        this.setState({
                            detail: [detail],
                            status,
                            userCoords: null,
                            error: false
                        })
                    }
                ).catch(e => {
                this.setState({error: true})
            })
        } else {
            this.roadApiService
                .getCoordinates(userCoords)
                .then(({detail, status}) => {
                        this.setState({
                            detail,
                            status,
                            userCoords,
                            userKmSearch: null,
                            error: false
                        })
                    }
                ).catch(e => {
                this.setState({error: true})
            })
        }

    }

    componentDidMount() {
        this.getUpdate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userCoords !== this.props.userCoords &&
            prevProps.userKmPlus !== this.props.userKmSearch) {
            this.getUpdate();
        }

        if (this.state.detail === undefined && prevState.detail !== this.state.detail) {
            this.setState({
                error: true,
                detail: []
            });
        }

    }


    render() {

        const {
            language,
            userCoords,
            userKmPlus,
            detail,
            status
        } = this.state;


        if (!status) {
            return <h3>No match</h3>
        }
        if (this.state.error) {
            return (
                <h3>Совпадений не найдено</h3>
            );
        }

        // const isLangUa = (language === 'uk') && true;
        let responseDetail = [];


        if ( detail) {
            responseDetail = detail.map(({id, name, sc, ut, kmp, coord = [], distance = 0}) => {
                return (
                    <div key={id}>
                        <p>name: {name}</p>
                        <p>sc: {sc}</p>
                        <p>ut: {ut}</p>
                        <p>Lat: {coord[coord.length - 1]}</p>
                        <p>Long: {coord[0]}</p>
                        <p>km: {kmp}</p>
                        {(userCoords) ? <p>distance: {distance}</p> : null}

                    </div>
                );
            });
        }

        return (
            <div className="search-response">
                {responseDetail}
            </div>
        );
    }
}

export default DetailsRoadSearch;