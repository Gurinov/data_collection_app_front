import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Account from "../components/account/Account";

class AppRouting extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/login"} component={Account}/>
                    <Route path={"/signup"} component={Account}/>
                    {/*<Route component={NotFound} />*/}
                </Switch>
            </Router>
        );
    }
}

export default AppRouting;