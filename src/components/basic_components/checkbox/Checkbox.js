import React from "react";
import { Form } from 'bootstrap-4-react';

class Checkbox extends React.Component {
    render() {
        return (
            <Form.CustomCheckbox id="customCheck1">
                Remember me
            </Form.CustomCheckbox>
        );
    }
}

export default Checkbox;