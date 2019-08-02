import React from "react";
import { Form } from 'bootstrap-4-react';

class Checkbox extends React.Component {
    render() {
        return (
            <Form.CustomCheckbox id={this.props.name} onClick={this.props.handleChange}>
                {this.props.name}
            </Form.CustomCheckbox>
        );
    }
}

export default Checkbox;