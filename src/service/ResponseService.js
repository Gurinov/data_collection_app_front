import axios from 'axios';
import links from "./Links";

class ResponseService {

    getAllForPagination(page, size) {
        let requestPath = links.RESPONSES_END_POINT + "?page=" + page + "&size=" + size;
        return axios.get(requestPath, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    getAll() {
        return axios.get(links.RESPONSES_END_POINT, {
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