import React from "react";
import {Form} from 'react-bootstrap';

class Radiobutton extends React.Component {
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
                {
                    this.props.options.map(option =>
                        <Form.Check
                            type='radio'
                            key={option.text}
                            name={this.props.label}
                            label={option.text}
                        />
                    )
                }
                {error}
            </div>
        )
    }
}

export default Radiobutton;