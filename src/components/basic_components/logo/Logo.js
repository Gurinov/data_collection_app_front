import React from "react";
import "./Logo.css"
import {Link} from "react-router-dom";

class Logo extends React.Component{
    render() {
        return (
            <Link className="logo" to="/" style={{ textDecoration: 'none' }}>
                <span className="logo__black">Logo</span>
                <span className="logo__blue">Type</span>
            </Link>
        );
    }
}

export default Logo;