import React from "react";
import "./Logo.css"

class Logo extends React.Component{
    render() {
        return (
            <div className="logo">
                <span className="logo__black">Logo</span>
                <span className="logo__blue">Type</span>
            </div>
        );
    }
}

export default Logo;