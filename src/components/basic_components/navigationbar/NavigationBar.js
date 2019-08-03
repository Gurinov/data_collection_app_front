import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import UserService from "../../../service/UserService";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        UserService.logout();
    }

    render() {
        let navbar;
        if (UserService.isAuthenticated()) {
            navbar =
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link className="text-black-50" eventKey="1" href="/fields">Fields</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-black-50" eventKey="2" href="/responses">Responses</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="User" id="nav-dropdown">
                        <NavDropdown.Item eventKey="3.1" href="/edit-profile">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item eventKey="3.2" href="/change-password">Change Password</NavDropdown.Item>
                        <NavDropdown.Item eventKey="3.3" href="/" onClick={this.logout}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
        } else {
            navbar =
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link className="text-black-50" eventKey="4" href="/login">Log In</Nav.Link>
                    </Nav.Item>
                </Nav>
        }

        return (
            navbar
        )
    }
}

export default NavigationBar;