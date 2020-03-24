

class GetUser {

    _apiUrl = "https://kmplus.shtab.net/home/me";

    getResource = async () => {
        const res = await fetch(this._apiUrl);

        if (!res.ok) {
            console.log(res);
            throw new Error(`Could not fetch ${this._apiUrl}` +
                            `, received ${res.status}`)
        }
        return await res.json();
    };

    async getUser() {
        const user = await this.getResource();
        return this._transformUser(user);
    }

    _transformUser = (user) => {
        // console.dir(categories);
        return {
            user: user.data,
            logged: user.logged
        }
    };

}

export default GetUser;