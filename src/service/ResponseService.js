import axios from 'axios';

class ResponseService {
    SERVER_PATH = 'http://192.168.100.138:8080/';
    RESPONSES_END_POINT = this.SERVER_PATH + 'responses';

    createResponse(answers) {
        let response = {answer: answers};
        return axios.post(this.RESPONSES_END_POINT, response, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }
    getToken() {
        return localStorage.getItem('token')
    }
}

export default new ResponseService();