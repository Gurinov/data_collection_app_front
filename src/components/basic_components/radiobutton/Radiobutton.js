import React from "react";
import {Form} from 'react-bootstrap';

class Radiobutton extends React.Component {
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
                {
                    this.props.options.map(option =>
                        <Form.Check
                            custom
                            type='radio'
                            value={option.text}
                            key={option.id}
                            id={option.id}
                            name={this.props.id}
                            label={option.text}
                            onChange={this.props.onChange}
                            disabled={this.props.isDisabled}
                        />
                    )
                }
                {error}
            </div>
        )
    }
}

export default Radiobutton;