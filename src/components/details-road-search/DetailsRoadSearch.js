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
        // const searchInput = this.props.userKmSearch || this.props.userCoords;
        const {userCoords, userKmSearch} = this.props;


        if(this.props.userKmSearch) {
            this.roadApiService
                .getUserKmPlus(userKmSearch, this.state.id)
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
        if(prevProps.userKmSearch !== this.props.userKmSearch) {
            this.getUpdate();
        }
        if (prevProps.userCoords !== this.props.userCoords) {
            this.getUpdate();
        }
        // if(prevProps.userCoords !== this.props.userCoords &&
        //     prevProps.userKmPlus !== this.props.userKmSearch) {
        //     this.getUpdate();
        // }
        //
        // if (this.state.detail === undefined && prevState.detail !== this.state.detail) {
        //     this.setState({
        //         error: true,
        //         detail: []
        //     });
        // }

    }


    render() {

        const {
            userCoords,
            detail,
            error
        } = this.state;


        if (error) {
            return (
                <h3>Неверный ввод</h3>
            );
        }

        // const isLangUa = (language === 'uk') && true;
        let responseDetail = [];

        if ( detail) {
            responseDetail = detail.map(({id, name, sc, ut, kmp, coord = [], distance = 0}) => {
                return (
                    <div key={id}>
                        {(userCoords) ? <h3>Результати пошуку за координатами</h3> : <h3>Результати пошуку за км+</h3>}
                        <p>name: {name}</p>
                        <p>sc: {sc}</p>
                        <p>ut: {ut}</p>
                        <p>Lat: {coord[coord.length - 1]}</p>
                        <p>Long: {coord[0]}</p>
                        <p>km: {kmp}</p>
                        {(userCoords) ? <p>distance: {distance}</p> : null}
                        <p><a href={`https://www.google.com.ua/maps/?q=${coord[coord.length - 1]},${coord[0]}`} rel="noopener noreferrer" target="_blank">На карте</a></p>

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