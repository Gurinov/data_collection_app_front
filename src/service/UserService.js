import axios from 'axios';
import links from "./Links";

class UserService {

    findUserByToken(){
        return axios.get(links.GET_BY_TOKEN_END_POINT,{headers: {
                "Authorization": this.getToken()
            }});
    }

    signin(login, password) {
        let loginInfo = {
            email: login,
            password: password
        };
        return axios.post(links.LOGIN_END_POINT, loginInfo);
    }

    signup(email, password, firstName, lastName, phone) {
        let user = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone
        };
        return axios.post(links.REGISTRATION_END_POINT, user);
    }

    editProfile(email, firstName, lastName, phone) {
        let user = {
            email: email,
            password: "",
            firstName: firstName,
            lastName: lastName,
            phone: phone
        };
        return axios.put(links.EDIT_PROFILE_END_POINT, user, {headers: {
                "Authorization": this.getToken()
            }});
    }

    changePassword(currentPassword, newPassword) {
        let passwords = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };
        return axios.put(links.CHANGE_PASSWORD_END_POINT, passwords, {headers: {
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