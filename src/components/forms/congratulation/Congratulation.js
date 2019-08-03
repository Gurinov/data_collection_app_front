import React, {Component} from 'react';
import Header from "../../basic_components/header/Header";

class Congratulation extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="container form">
                    <div className="form__body">
                        <p className="title">Thank you!</p>
                        <p>Your response was saved.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Congratulation;