import React, {Component} from 'react';
import RoadApiService from "../../services/roadapi-service";
import "./home.css";
import {Link} from "react-router-dom";



class Home extends Component {

    _isMounted = false;

    state = {
        isLoading: true,
        categoriesArr: [],
        language: this.props.lang,
    };


    roadApiService = new RoadApiService(this.state.language);

    componentDidMount() {
        this._isMounted = true;

        this.roadApiService
            .getAllCategories()
            .then(({categoriesArr})=>{
                if (this._isMounted) {
                    this.setState({
                        categoriesArr,
                        isLoading: false
                    });
                }
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    renderCategoryArr (arr) {
        return arr.map(({id, name, sc})=>{
            return (
                <li key={id}>
                    <Link to={`route/${id}`}>
                    <span style={{fontWeight: 'bold'}}>{sc}  </span>
                    {name}
                    <i className="fas fa-arrow-circle-right"/>
                    </Link>
                </li>
            );
        });
    }


    render() {

        if(!this.state.categoriesArr) {
            return (
                <section className='routes-categories container'>Loading...</section>
            );
        }

        const {categoriesArr, language} = this.state;


        categoriesArr.sort((a, b)=> a.id - b.id);

        const RenderedCategoriesArr = categoriesArr.map(({id, name, r10})=>{

            const routes = this.renderCategoryArr(r10);
            return (
                <div key={id} className="homeItemWrap">
                    <h3 >{name} : {id}</h3>
                    <ul >{routes}</ul>
                    <div className="btn-wrap">
                        <Link to={`/categories/${id}`}>
                            <span>{(language === 'uk') ? 'розгорнути список' : 'more details'}</span>
                        </Link>
                    </div>

                </div>
            );
        });

        return (
            <div className="home container">
                {RenderedCategoriesArr}
            </div>
        );
    }
}

export default Home;