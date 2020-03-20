import React, {Component} from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./details-road.css";
import {Link} from "react-router-dom";
import RoadApiService from "../../services/roadapi-service";
import DetailsRoadSearch from "../details-road-search";


class DetailsRoad extends Component {

    state = {
        routeDetailsId: null,
        routeDetailsType: '',
        routeDetailsName: '',
        routeDetailsSc: '',
        routeDetailsDots: [],
        routeDetailsOwners: [],
        modalOpen: false,
        language: this.props.lang,

        userCoords: null,
        userKmSearch: null,
        searchStatus: false,


        // userCoords: '30.73839863,50.4897829',
        // detail: [],

    };

    roadApiService = new RoadApiService(this.state.language);

    componentDidMount() {

        const {id} = this.props.match.params;

        this.roadApiService
            .getRouteDetails(id)
            .then(({
                       routeDetailsId,
                       routeDetailsType,
                       routeDetailsName,
                       routeDetailsSc,
                       routeDetailsDots,
                       routeDetailsOwners
                   }) => {
                this.setState({
                    routeDetailsId,
                    routeDetailsType,
                    routeDetailsName,
                    routeDetailsSc,
                    routeDetailsDots,
                    routeDetailsOwners
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    getSearchStatus = (searchStatus) => {
        if (searchStatus) {
            this.setState({searchStatus});
        }
    };

    clearSearch = () => {
        document.getElementById('userKmSearch').value = '';
        document.getElementById('lat').value = '';
        document.getElementById('long').value = '';
        this.setState({
            userCoords: null,
            userKmSearch: null
        });
    };

    render() {

        const {
            routeDetailsId,
            routeDetailsType,
            routeDetailsName,
            routeDetailsSc,
            routeDetailsDots,
            routeDetailsOwners,
            modalOpen,
            language
        } = this.state;

        const isLangUa = (language === 'uk') && true;

        const tBody = routeDetailsOwners.map(({id, owner, from, to}) => {
            return (
                <tr key={id}>
                    <td>{from.kmp}</td>
                    <td>{to.kmp}</td>
                    <td>{owner}</td>
                </tr>
            );
        });


        return (

            <section className="container details-road">
                <div key={routeDetailsId}
                     className={(modalOpen) ? 'modalDetails' : 'modalDetails modalDetailsHide'}>
                    <div className="modalDetailsContent">
                        <div className="modalDetailsTitle">
                            <span>{routeDetailsSc}</span>
                            {routeDetailsName} </div>
                        <div
                            className="modalDetailsType">{routeDetailsType}</div>
                        <div
                            className="modalDetailsDots">{(isLangUa) ? 'Початок дороги км, м ' : 'Road start '}<span>{routeDetailsDots[0]}</span>
                        </div>
                        <div
                            className="modalDetailsDots">{(isLangUa) ? 'Кінець дороги км, м ' : 'Road end '}<span>{routeDetailsDots[routeDetailsDots.length - 1]}</span>
                        </div>
                        <div className="routeDetailsOwners">
                            {(routeDetailsOwners.length) ?
                                (
                                    <div>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>
                                                    {(isLangUa) ? 'Від км+ ' : 'From km+ '}
                                                </th>
                                                <th>
                                                    {(isLangUa) ? 'До км+ ' : 'To km+ '}
                                                </th>
                                                <th>
                                                    {(isLangUa) ? 'Підпорядкування ' : 'Subordination '}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {tBody}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : <h3>EMPTY OWNERS</h3>}
                        </div>
                        <div className="routeDetailsClose"
                             onClick={() => {
                                 this.setState({modalOpen: false})
                             }}>
                            <svg
                                // xmlns="httpS://www.w3.org/2000/svg"
                                viewBox="0 0 357 357">
                                <polygon points="357 35.7 321.3 0 178.5 142.8 35.7 0 0 35.7 142.8 178.5 0 321.3 35.7 357 178.5 214.2 321.3 357 357 321.3 214.2 178.5 "/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="detailsNav">

                    <p>
                        <span>{routeDetailsSc} </span>{routeDetailsName}
                    </p>
                    <button className="btn-about"
                            onClick={() => {
                                this.setState({modalOpen: true})
                            }}>{(isLangUa) ? 'Про дорогу ' : 'About road '}</button>
                    <Link to="/"
                          className="linkHome">{(isLangUa) ? 'На головну ' : 'Main page '}</Link>
                </div>
                <div>
                    <div>
                        <h3>{(isLangUa) ? 'Пошук за координатами ' : 'Search by coordinates '}</h3>
                        <div className="form-wrap">
                            <form name="search-coords">
                                <div
                                    className="inputs-group">
                                    <label>Lat 50.4897829<input
                                        type="text" id='lat'/></label>
                                    <label>Long 30.73839863<input
                                        type="text" id='long'/></label>
                                </div>
                                <button
                                    className="search-btn"
                                    onClick={(event)=>{
                                        event.preventDefault();
                                        let lat = document.getElementById('lat').value;
                                        let long = document.getElementById('long').value;
                                        document.getElementById('userKmSearch').value = '';

                                        let newUserCoords = null;
                                        if (lat && long) {
                                            newUserCoords = (long + ',' + lat);
                                        }
                                        // this.setState({userCoords});
                                        this.setState({userCoords: newUserCoords, userKmSearch: null});
                                    }} >
                                    <i className="fas fa-search" />
                                    {(isLangUa) ? 'Шукаты' : 'Search'}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <h3>{(isLangUa) ? 'Пошук за кілометровою прив\'язкою (км+)' : 'Search by kilometer bound (km +)'}</h3>
                        <div className="form-wrap">
                            <p>
                                * {(isLangUa) ? 'для пошуку введіть значення через десятковий роздільник' : 'enter a decimal point to search'}
                            </p>
                            <form name="search-distance">
                                <div
                                    className="inputs-group">
                                    <label>{(isLangUa) ? 'KM, M ' : 'km, m'}<input
                                        type="text"
                                        id='userKmSearch'/></label>
                                </div>
                                <button
                                    className="search-btn"
                                    onClick={(event)=>{
                                        event.preventDefault();
                                        let userKmSearch = document.getElementById('userKmSearch').value;

                                        document.getElementById('lat').value = '';

                                        document.getElementById('long').value = '';

                                        this.setState({userKmSearch, userCoords: null});
                                    }}
                                    >
                                    <i className="fas fa-search"/>{(isLangUa) ? 'Шукаты' : 'Search'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* ----------- Searc Response ---------- */}

                {(this.state.userCoords || this.state.userKmSearch) ?
                    (<React.Fragment>
                            <DetailsRoadSearch {...this.props} id={this.state.routeDetailsId} userCoords={this.state.userCoords} userKmSearch={this.state.userKmSearch} />
                            <button onClick={()=>{this.clearSearch()}}>Очистити пошук</button>
                        </React.Fragment>
                        ) :
                    null}
                {/*<DetailsRoadSearch {...this.props} userCoords={this.state.userCoords}/>*/}
                {/* --------- End Search Response  ------- */}
            </section>
        );
    }
}


export default DetailsRoad;