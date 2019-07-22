import React from "react";
import {Route, Switch} from "react-router";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import {BrowserRouter as Router} from "react-router-dom";
import "./Account.css"

class Account extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/signup"} component={Signup}/>
                </Switch>
            </Router>
        );
    }
}

export default Account;