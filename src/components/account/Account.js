import React from "react";
import {Route, Switch} from "react-router";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import {BrowserRouter as Router} from "react-router-dom";
import "./Account.css"
import EditProfile from "./edit_profile/EditProfile";
import ChangePassword from "./chenge_passwword/ChangePassword";

class Account extends React.Component{
    render() {
        return (
            <Router>
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

export default Account;