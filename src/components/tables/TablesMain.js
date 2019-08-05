import React from "react";
import {Route, Switch} from "react-router";
import {Router} from "react-router-dom";
import "./TablesMain.css"
import Header from "../basic_components/header/Header";
import FieldsTable from "./fields_table/FieldsTable";
import ResponsesTable from "./responses_table/ResponsesTable";

class TablesMain extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <Router history={this.props.history}>
                        <Switch>
                            <Route path={"/fields"} component={FieldsTable}/>
                            <Route path={"/responses"} component={ResponsesTable}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default TablesMain;