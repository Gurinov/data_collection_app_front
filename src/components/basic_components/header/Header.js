import React from "react";
import "./Header.css"
import NavigationBar from "../navigationbar/NavigationBar";
import Logo from "../logo/Logo";
import {Col, Container, Row} from "react-bootstrap";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Container>
                    <Row>
                        <Col>
                            <Logo/>
                        </Col>
                        <Col>
                            <NavigationBar/>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Header;