import React from "react";
import {Form} from 'react-bootstrap';

class Combobox extends React.Component {

    render() {
        let label;
        let error;
        if (this.props.label) {
            label =
                <div>
                    <label className="text-muted">{this.props.label}</label>
                    {this.props.required ? <label className="text-danger">*</label> : null}
                </div>
        }
        if (this.props.error) {
            error = <label className="text-danger">{this.props.error}</label>

        }

        return (
            <div className="label text-left">
                {label}
                <Form.Control as="select"
                              id={this.props.name}
                              name={this.props.name}
                              onChange={this.props.handleChange}
                              defaultValue={this.props.defaultValue}>
                    {
                        this.props.options.map(option =>
                            <option key={option.text} value={option.text}>{option.text}</option>
                        )
                    }
                </Form.Control>
                {error}
            </div>
        )
    }
}

export default Combobox;