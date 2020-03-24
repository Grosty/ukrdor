import React, {Component} from 'react';
import GetUser from "../services/getUser";

class ProfilePage extends Component {
    _isMounted = false;

    state = {
        isLoading: true,
        lang: this.props.lang,
        userFirstName: '',
        userLastName: '',
        userPhone: '',
        userMail: '',
        logged: false,
        user: {}
    };

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState((state, props)=>({
                isLoading: false,
                user: props.user,
                logged: props.logged
            }))
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.state.userPhone);
    }


    change = (e) => {
        let {type, name, value} = e.target;

        let lastPhoneChar = (!!value.length) && value[value.length - 1];

        if (type === 'tel' && value[0] === '0') {
            value = `38${value}`;
        }

        if ((type === 'tel' && isNaN(lastPhoneChar)) || (type === 'tel' && value.length > 12)) {
            return;
        }

        this.setState({[name]: value.trim()});
    };

    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        const {userFirstName, userLastName, userPhone, userMail} = this.state;
        const { user, logged } = this.state;
        console.log(logged);

        return (
            <div className='container userProfileForm'>
                <h3>Profile page</h3>
                <form onSubmit={this.submit} >
                    <div className='inputLine'>
                        <label htmlFor="userFirstName">First Name * </label>
                        <input type="text" name='userFirstName' id='userFirstName' value={userFirstName} placeholder='Ваше имя' onChange={this.change}/>
                    </div>
                    <div className='inputLine'>
                        <label htmlFor="userLastName">Last Name * </label>
                        <input type="text" name='userLastName' id='userLastName' value={userLastName} placeholder='Ваша фамилия' onChange={this.change}/>
                    </div>
                    <div className='inputLine'>
                        <label htmlFor="userPhone">Phone * </label>
                        <input type="tel" name='userPhone' id='userPhone' value={userPhone} placeholder='380901234567' onChange={this.change}/>
                    </div>
                    <div className='inputLine'>
                        <label htmlFor="userMail">e-mail</label>
                        <input type="email" name='userMail' id='userMail' value={userMail} placeholder='example@mail.my' onChange={this.change}/>
                    </div>
                    { (userFirstName && userLastName && userPhone ) ? <button>Отправить</button> : <p>Заполните коректно обязательные (*) поля формы</p>}
                </form>
                <hr/>
                {
                    logged &&
                        <div>
                            <p>Name: {user.fname} {user.lname}</p>
                            <p>apiKey: {user.apikey}</p>
                            <p>country: {user.country}</p>
                            <p>email: {user.email}</p>
                            <p>country: {user.country}</p>
                        </div>
                }
            </div>
        );
    }
}

export default ProfilePage;