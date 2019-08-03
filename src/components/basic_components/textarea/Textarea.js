import React from "react";
import {Form} from 'react-bootstrap';

class Textarea extends React.Component {

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
                <Form.Control as="textarea"
                              id={this.props.id}
                              name={this.props.name}
                              rows={this.props.rows}
                              value={this.props.defaultValue}
                              onChange={this.props.onChange}
                              disabled={this.props.isDisabled}
                />
                {error}
            </div>
        )
    }
}

export default Textarea;