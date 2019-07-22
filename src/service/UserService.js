import axios from 'axios';

class UserService {
    LOGIN_END_POINT = 'http://localhost:8080/users/login';
    REGISTRATION_END_POINT = 'http://localhost:8080/users/signup';

    signin(login, password) {
        let loginInfo = {
            email: login,
            password: password
        };
        return axios.post(this.LOGIN_END_POINT, loginInfo);
    }

    signup(email, password, firstName, lastName, phone) {
        let user = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone
        };
        return axios.post(this.REGISTRATION_END_POINT, user);
    }

    saveToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logoout() {
        localStorage.removeItem('token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new UserService();