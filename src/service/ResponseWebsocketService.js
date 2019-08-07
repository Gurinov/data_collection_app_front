import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import axios from "axios";

const ResponseWebsocketService = {};
ResponseWebsocketService.SERVER_PATH = 'https://questionnaire-portal.herokuapp.com/websocket';

ResponseWebsocketService.stomp = null;

ResponseWebsocketService.connect = function () {
    let socket = new SockJs(ResponseWebsocketService.SERVER_PATH);
    this.stomp = Stomp.over(socket);
    this.stomp.connect({}, function () {
        ResponseWebsocketService.stomp.subscribe('/responses/onAdd', ResponseWebsocketService.callback);
    })
};

ResponseWebsocketService.send = function (message) {
    ResponseWebsocketService.stomp.send("/app/responses", {}, JSON.stringify(message));
};

ResponseWebsocketService.getAllResponses = function () {
    return axios.get(ResponseWebsocketService.FIELDS_END_POINT, {
        headers: {
            "Authorization": localStorage.getItem('token')
        }});
};

export default ResponseWebsocketService;