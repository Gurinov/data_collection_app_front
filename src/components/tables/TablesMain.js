import React from "react";
import {Route, Switch} from "react-router";
import {Router} from "react-router-dom";
import "./TablesMain.css"
import Header from "../basic_components/header/Header";
import FieldsTable from "./fields_table/FieldsTable";

class TablesMain extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <Router history={this.props.history}>
                        <Switch>
                            <Route path={"/fields"} component={FieldsTable}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default TablesMain;