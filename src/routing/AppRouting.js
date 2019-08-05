import React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import FormMain from "../components/forms/FormMain";
import TablesMain from "../components/tables/TablesMain";
import { createBrowserHistory } from "history";
import UserService from "../service/UserService";

const customHistory = createBrowserHistory();

class AppRouting extends React.Component {
    render() {
        let routes;
        if (UserService.getToken()) {
            routes =
                <Switch>
                    <Route exact path={"/"} component={FormMain}/>
                    <Route exact path={"/congratulation"} component={FormMain}/>
                    <Route exact path={"/edit-profile"} component={FormMain}/>
                    <Route exact path={"/change-password"} component={FormMain}/>
                    <Route exact path={"/fields"} component={TablesMain}/>
                    <Route exact path={"/responses"} component={TablesMain}/>
                    <Redirect to="/"/>
                </Switch>
        } else {
            routes =
                <Switch>
                    <Route exact path={"/"} component={FormMain}/>
                    <Route exact path={"/congratulation"} component={FormMain}/>
                    <Route exact path={"/login"} component={FormMain}/>
                    <Route exact path={"/signup"} component={FormMain}/>
                    <Redirect to="/"/>
                </Switch>}
        return (
            <Router history={customHistory}>
                {routes}
            </Router>
        );
    }
}

export default AppRouting;