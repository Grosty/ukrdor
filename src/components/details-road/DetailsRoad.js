import React, {Component} from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./details-road.css";
import {Link} from "react-router-dom";
import RoadApiService from "../../services/roadapi-service";

class DetailsRoad extends Component {

    state= {
        routeDetailsId: null,
        routeDetailsType: '',
        routeDetailsName: '',
        routeDetailsSc: '',
        routeDetailsDots: [],
        routeDetailsOwners: [],
        modalOpen: false,
        language: this.props.lang
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

        // const tBody = routeDetailsOwners.map((item)=>{
        //     return <p>tBody item</p>
        // });

        return (
            

            <section className="container details-road">

                <div className={ (modalOpen) ? 'modalDetails' : 'modalDetails modalDetailsHide'  }>
                    <div className="modalDetailsContent">
                        {/*<p>ID: {routeDetailsId}, </p>*/}
                        <div className="modalDetailsTitle">
                            <span>{routeDetailsSc}</span>
                            {routeDetailsName} </div>
                        <div  className="modalDetailsType">{routeDetailsType}</div>
                        <div  className="modalDetailsDots">{(language === 'uk') ? 'Початок дороги км, м' : 'Road start ' }<span>{routeDetailsDots[0]}</span> </div>
                        <div  className="modalDetailsDots">{(language === 'uk') ?'Кінець дороги км, м ' : 'Road end '}<span>{routeDetailsDots[routeDetailsDots.length - 1]}</span> </div>
                        <div className="routeDetailsOwners">
                            { (!routeDetailsOwners.length) ?
                                (
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        { (language === 'uk') ? 'Від км+ ' : 'From km+ ' }
                                                    </th>
                                                    <th>
                                                        { (language === 'uk') ? 'До км+ ' : 'To km+ ' }
                                                    </th>
                                                    <th>
                                                        { (language === 'uk') ? 'Підпорядкування ' : 'Subordination ' }
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>111</td>
                                                    <td>111</td>
                                                    <td>Owner</td>
                                                </tr>
                                                <tr>
                                                    <td>111</td>
                                                    <td>111</td>
                                                    <td>Owner</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : <h3>EMPTY OWNERS</h3>}
                        </div>
                        <div className="routeDetailsClose" onClick={()=>{this.setState({modalOpen: false})}}>
                            <svg xmlns="httpS://www.w3.org/2000/svg" viewBox="0 0 357 357"><polygon points="357 35.7 321.3 0 178.5 142.8 35.7 0 0 35.7 142.8 178.5 0 321.3 35.7 357 178.5 214.2 321.3 357 357 321.3 214.2 178.5 "></polygon></svg>
                        </div>
                    </div>
                </div>

                <div className="detailsNav">

                    <p><span>{routeDetailsSc} </span>{routeDetailsName}</p>
                    <button className="btn-about" onClick={()=>{this.setState({modalOpen: true})}}>{ (language === 'uk') ? 'Про дорогу ' : 'About road ' }</button>
                    <Link to="/" className="linkHome">{ (language === 'uk') ? 'На головну ' : 'Main page ' }</Link>
                </div>
                <div>
                    <div>
                        <h3>{ (language === 'uk') ? 'Пошук за координатами ' : 'Search by coordinates ' }</h3>
                        <div className="form-wrap">
                            <form name="search-coords">
                                <div className="inputs-group">
                                    <label>Lat <input type="text"/></label>
                                    <label>Long <input type="text"/></label>
                                </div>
                                <button className="search-btn"><i className="fas fa-search"/>{ (language === 'uk') ? 'Шукаты' : 'Search'}</button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <h3>{ (language === 'uk') ? 'Пошук за кілометровою прив\'язкою (км+)' : 'Search by kilometer bound (km +)'}</h3>
                        <div className="form-wrap">
                            <p>
                                * { (language === 'uk') ? 'для пошуку введіть значення через десятковий роздільник' : 'enter a decimal point to search'}
                            </p>
                            <form name="search-distance">
                                <div className="inputs-group">
                                    <label>{ (language === 'uk') ? 'KM, M ' : 'km, m' }<input type="text"/></label>
                                </div>
                                <button className="search-btn"><i className="fas fa-search"/>{ (language === 'uk') ? 'Шукаты' : 'Search'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default DetailsRoad;