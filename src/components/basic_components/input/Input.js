import React from "react";
import {Form} from 'react-bootstrap';

class Input extends React.Component {

    render() {
        let label;
        let error;
        if (this.props.label) {
            label =
                <div>
                    <label className="text-muted custom_input">{this.props.label}</label>
                    {this.props.required ? <label className="text-danger">*</label> : null}
                </div>
        }
        if (this.props.error) {
            error = <label className="text-danger">{this.props.error}</label>
        }

        return (
            <div className="text-left">
                {label}
                <Form.Control
                    id={this.props.id}
                    name={this.props.name}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.defaultValue}
                    onChange={this.props.onChange}
                    disabled={this.props.disabled}/>
                {error}
            </div>
        )
    }
}

export default Input;