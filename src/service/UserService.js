import axios from 'axios';

class UserService {
    SERVER_PATH = 'http://192.168.100.138:8080/';
    LOGIN_END_POINT = this.SERVER_PATH + 'users/login';
    REGISTRATION_END_POINT = this.SERVER_PATH + 'users/signup';
    EDIT_PROFILE_END_POINT = this.SERVER_PATH + 'users';
    GET_BY_TOKEN_END_POINT = this.SERVER_PATH + 'users/byToken';
    CHANGE_PASSWORD_END_POINT = this.SERVER_PATH + 'users/password';

    findUserByToken(){
        return axios.get(this.GET_BY_TOKEN_END_POINT,{headers: {
                "Authorization": this.getToken()
            }});
    }

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

    editProfile(email, firstName, lastName, phone) {
        let user = {
            email: email,
            password: "",
            firstName: firstName,
            lastName: lastName,
            phone: phone
        };
        return axios.put(this.EDIT_PROFILE_END_POINT, user, {headers: {
                "Authorization": this.getToken()
            }});
    }

    changePassword(currentPassword, newPassword) {
        let passwords = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };
        return axios.put(this.CHANGE_PASSWORD_END_POINT, passwords, {headers: {
                "Authorization": this.getToken()
            }});
    }

    saveToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new UserService();