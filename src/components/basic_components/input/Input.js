import React from "react";
import {Form} from 'bootstrap-4-react';

class Input extends React.Component {

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
                <Form.Input placeholder={this.props.placeholder} name={this.props.name} type={this.props.type}
                            defaultValue={this.props.value} onChange={this.props.onChange}/>
                {error}
            </div>
        )
    }
}

export default Input;