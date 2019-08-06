import axios from 'axios';
import links from "./Links";

class FieldService {

    getFieldsForPagination(page, size) {
        let requestPath = links.FIELDS_END_POINT + "?page=" + page + "&size=" + size;
        return axios.get(requestPath);
    }

    getAllFields() {
        return axios.get(links.FIELDS_END_POINT);
    }

    getFieldById(id) {
        let requestPath = links.FIELDS_END_POINT + "/" + id;
        return axios.get(requestPath, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    deleteField(id) {
        let requestPath = links.FIELDS_END_POINT + "/" + id;
        return axios.delete(requestPath, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    createField(field) {
        return axios.post(links.FIELDS_END_POINT, field, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    updateField(field) {
        return axios.put(links.FIELDS_END_POINT, field, {
            headers: {
                "Authorization": this.getToken()
            }
        });
    }

    getToken() {
        return localStorage.getItem('token')
    }

    getAllResponses = function () {
        return axios.get(links.FIELDS_END_POINT, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }});
    };
}

export default new FieldService();