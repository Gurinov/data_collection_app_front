import React from "react";
import { Form } from 'bootstrap-4-react';

class Checkbox extends React.Component {
    render() {
        console.log(this.props.active)
        return (
            <Form.CustomCheckbox id={this.props.name}
                                 checked={this.props.active}
                                 onChange={this.props.handleChange}>
                {this.props.label}
            </Form.CustomCheckbox>
        );
    }
}

export default Checkbox;