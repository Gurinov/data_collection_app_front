const links = {};

links.SERVER_PATH = 'http://192.168.100.138:8080/';
links.FIELDS_END_POINT = links.SERVER_PATH + 'fields';
links.LOGIN_END_POINT = links.SERVER_PATH + 'users/login';
links.REGISTRATION_END_POINT = links.SERVER_PATH + 'users/signup';
links.EDIT_PROFILE_END_POINT = links.SERVER_PATH + 'users';
links.GET_BY_TOKEN_END_POINT = links.SERVER_PATH + 'users/byToken';
links.CHANGE_PASSWORD_END_POINT = links.SERVER_PATH + 'users/password';
links.RESPONSES_END_POINT = links.SERVER_PATH + 'responses';


export default links;