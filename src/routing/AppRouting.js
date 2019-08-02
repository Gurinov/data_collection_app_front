import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import FormMain from "../components/forms/FormMain";
import TablesMain from "../components/tables/TablesMain";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

class AppRouting extends React.Component {
    render() {
        return (
            <Router history={customHistory}>
                <Switch>
                    <Route path={"/login"} component={FormMain}/>
                    <Route path={"/signup"} component={FormMain}/>
                    <Route path={"/edit-profile"} component={FormMain}/>
                    <Route path={"/change-password"} component={FormMain}/>

                    <Route path={"/fields"} component={TablesMain}/>
                    {/*<Route component={NotFound} />*/}
                </Switch>
            </Router>
        );
    }
}

export default AppRouting;