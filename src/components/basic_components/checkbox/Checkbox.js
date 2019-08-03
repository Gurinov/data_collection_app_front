import React from "react";
import { Form } from 'react-bootstrap';

class Checkbox extends React.Component {
    render() {
        console.log(this.props.defaultChecked)

        return (
            <div className="custom_input">
                <Form.Check
                    custom
                    id={this.props.id}
                    checked={this.props.defaultChecked === "true"}
                    onChange={this.props.onChange}
                    disabled={this.props.isDisabled}
                    label={this.props.label}
                />
            </div>
        );
    }
}

export default Checkbox;