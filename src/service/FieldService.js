import axios from 'axios';
import ResponseWebsocketService from "./ResponseWebsocketService";

class FieldService {
    SERVER_PATH = 'http://192.168.100.138:8080/';
    FIELDS_END_POINT = this.SERVER_PATH + 'fields';
    RESPONSES_END_POINT = ResponseWebsocketService.SERVER_PATH + 'responses';

    getFieldsForPagination(page, size) {
        let requestPath = this.FIELDS_END_POINT + "?page=" + page + "&size=" + size;
        return axios.get(requestPath);
    }

    getAllFields() {
        return axios.get(this.FIELDS_END_POINT);
    }

    getFieldById(id) {
        let requestPath = this.FIELDS_END_POINT + "/" + id;
        return axios.get(requestPath, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    deleteField(id) {
        let requestPath = this.FIELDS_END_POINT + "/" + id;
        return axios.delete(requestPath, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    createField(field) {
        return axios.post(this.FIELDS_END_POINT, field, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    updateField(field) {
        return axios.put(this.FIELDS_END_POINT, field, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    getToken() {
        return localStorage.getItem('token')
    }

    getAllResponses = function () {
        return axios.get(this.FIELDS_END_POINT, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }});
    };
}

export default new FieldService();