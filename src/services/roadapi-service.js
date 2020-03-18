export default class RoadApiService {

    constructor(language) {
        this.language = language;
    }

    _apiBase = 'https://kmplus.shtab.net/api/v1';

    // langUa = 'uk';
    // langEn = 'en';
    // language = 'uk';

    //https://kmplus.shtab.net/api/v1/wgs84/30.73839863,50.4897829

    getResource =  async (url, lang = this.language) => {
        // const res = await fetch(`${this._apiBase}${url}`,
        //     {
        //         headers: {
        //             'Accept-Language': lang}
        //         }
        //     );

        // if (!res.ok) {
        //     console.log(res);
        //     throw new Error(`Could not fetch ${url}` +
        //                     `, received ${res.status}`)
        // }
        // return await res.json();
        try {
            const res = await fetch(`${this._apiBase}${url}`,
                {
                    headers: {
                        'Accept-Language': lang}
                    }
                );
            return await res.json();
        }catch (e) {
            throw e;
        }
    };

    async getUserKmPlus(km, id) {
        const routeCoords = await this.getResource(`/kmp/${id}/${km}`);
        return this._transformUserKmPlus(routeCoords, km);
    }

    _transformUserKmPlus = (routeCoords, km) => {
        // console.dir(categories);
        return {
            status: routeCoords.status,
            detail: routeCoords.detail[km]
        }
    };

    async getCoordinates(coords) {
        const routeCoords = await this.getResource(`/wgs84/${coords}`);
        return this._transformCoordinates(routeCoords, coords);
    }

    _transformCoordinates = (routeCoords, coords) => {
        // console.dir(categories);
        return {
            status: routeCoords.status,
            detail: routeCoords.detail[coords]
        }
    };

    async getRouteDetails(id) {
        const routeDetails = await this.getResource(`/route/${id}`);
        return this._transformRouteDetails(routeDetails);
    }

    async getCategoryRoute(id) {

        const route = await this.getResource(`/routes/${id}`);
        return this._transformRoute(route);
    }

    async getAllCategories(lang = this.language) {
        const categories = await this.getResource(`/route_types/`, lang);
        return this._transformAllCategories(categories);
    }

    _transformRouteDetails = (routeDetails) => {
        return {
            routeDetailsId: routeDetails.data.id,
            routeDetailsType: routeDetails.data.type,
            routeDetailsName: routeDetails.data.name,
            routeDetailsSc: routeDetails.data.sc,
            routeDetailsDots: routeDetails.data.dots,
            routeDetailsOwners: routeDetails.data.owners
        }
    };

    _transformAllCategories = (categories) => {
        // console.dir(categories);
        return {
            categoriesArr: categories.data,
        }
    };

    _transformRoute = (route) => {

        const routesList = route.data.r.sort((a, b) => a.id - b.id);
        return {
            id: route.data.id,
            nameCategory: route.data.name,
            routesList,
            sc: route.data.sc
        }
        // return {
        //     id: route.data.id,
        //     nameCategory: route.data.name,
        //     routesList: route.data.r,
        //     sc: route.data.sc
        // }
    };
}
