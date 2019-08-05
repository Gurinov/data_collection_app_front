import React from "react";
import { Form } from 'react-bootstrap';

class Checkbox extends React.Component {
    render() {
        return (
            <div className="custom_input">
                <Form.Check
                    custom
                    id={this.props.id}
                    checked={this.props.defaultChecked}
                    defaultValue={this.props.defaultValue}
                    onChange={this.props.onChange}
                    disabled={this.props.disabled}
                    label={this.props.label}
                />
            </div>
        );
    }
}

export default Checkbox;