import axios from 'axios';

class ResponseService {
    SERVER_PATH = 'http://192.168.100.138:8080/';
    RESPONSES_END_POINT = this.SERVER_PATH + 'responses';

    getAllForPagination(page, size) {
        let requestPath = this.RESPONSES_END_POINT + "?page=" + page + "&size=" + size;
        return axios.get(requestPath, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    getAll() {
        return axios.get(this.RESPONSES_END_POINT, {
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