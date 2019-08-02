import React from "react";
import {Route, Switch} from "react-router";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import {Router} from "react-router-dom";
import "./FormMain.css"
import EditProfile from "./edit_profile/EditProfile";
import ChangePassword from "./chenge_password/ChangePassword";

class FormMain extends React.Component{
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/signup"} component={Signup}/>
                    <Route path={"/edit-profile"} component={EditProfile}/>
                    <Route path={"/change-password"} component={ChangePassword}/>
                </Switch>
            </Router>
        );
    }
}

export default FormMain;