export default class RoadApiService {

    _apiBase = 'https://kmplus.shtab.net/api/v1';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async getRouteDetails(id) {
        const routeDetails = await this.getResource(`/route/${id}`);
        return this._transformRouteDetails(routeDetails);
    }

    async getCategoryRoute(id) {

        const route = await this.getResource(`/routes/${id}`);
        return this._transformRoute(route);
    }

    async getAllCategories() {
        const categories = await this.getResource(`/route_types/`);
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
