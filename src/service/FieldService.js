import axios from 'axios';

class FieldService {
    FIELDS_END_POINT = 'http://localhost:8080/fields';

    getAllFields(page, size) {
        let requestPath = this.FIELDS_END_POINT + "?page=" + page + "&size=" + size;
        return axios.get(requestPath, {
            headers: {
                "Authorization": this.getToken()
            }
        });
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
}

export default new FieldService();