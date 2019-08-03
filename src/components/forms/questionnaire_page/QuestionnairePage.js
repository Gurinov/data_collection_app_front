import React from "react";
import Input from "../../basic_components/input/Input";
import Header from "../../basic_components/header/Header";
import Textarea from "../../basic_components/textarea/Textarea";
import Checkbox from "../../basic_components/checkbox/Checkbox";
import Combobox from "../../basic_components/combobox/Combobox";
import Radiobutton from "../../basic_components/radiobutton/Radiobutton";
import {Button} from "bootstrap-4-react";
import FieldService from "../../../service/FieldService";
import ResponseService from "../../../service/ResponseService";

class QuestionnairePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            fields: [],
            answers: [],
            requiredFields: []
        };
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.radiobuttonHandleChange = this.radiobuttonHandleChange.bind(this);
        this.checkboxHandleChange = this.checkboxHandleChange.bind(this);
        this.isValidForm = this.isValidForm.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    componentDidMount() {
        this.updateForm();
    }

    updateForm() {
        FieldService.getAllFields().then(
            (response) => {
                let answers = [];
                let requiredFields = [];
                response.data.forEach(field => {
                    (field.type === "RADIOBUTTON") ? answers[field.id] = this.state.answers[field.id] :
                        (field.type === "COMBOBOX") ? answers[field.id] = field.options[0].text :
                            (field.type === "CHECKBOX") ? answers[field.id] = false.toString() : answers[field.id] = '';
                    if (field.required) {
                        requiredFields.push({id: field.id})
                    }
                });
                this.setState({
                    fields: response.data,
                    answers: answers,
                    requiredFields: requiredFields
                })
            }
        );
    }

    submitForm() {
        if (this.isValidForm()) {
            ResponseService.createResponse(this.state.answers).then(
                (response) => {
                    this.props.history.push('/congratulation');
                }
            )
        }
    }

    resetForm() {
        this.updateForm();
    }

    isValidForm() {
        let isValid = true;
        this.setState({error: ''});
        this.state.fields.forEach(field => {
            if ((field.required && !this.state.answers[field.id])) {
                this.setState({error: 'Required fields can not be empty'});
                isValid = false;
            }
        });
        return isValid;
    }


    handleChange(event) {
        if (event) {
            this.setState({
                answers: {
                    ...this.state.answers,
                    [event.target.id]: event.target.value
                }
            });
        }
    }

    radiobuttonHandleChange(event) {
        if (event) {
            this.setState({
                answers: {
                    ...this.state.answers,
                    [event.target.name]: event.target.value
                }
            });
        }
    }

    checkboxHandleChange(event) {
        if (event) {
            this.setState({
                answers: {
                    ...this.state.answers,
                    [event.target.id]: event.target.checked.toString()
                }
            });
        }
    }

    render() {
        let allFields = [];
        this.state.fields.map(field => {
            switch (field.type) {
                case "SINGLE_LINE_TEXT":
                    allFields.push(
                        <Input
                            id={field.id}
                            label={field.label}
                            name={field.label}
                            defaultValue={this.state.answers[field.id]}
                            onChange={this.handleChange}
                            disabled={field.disabled}
                            required={field.required}
                        />
                    );
                    break;
                case "MULTILINE_TEXT":
                    allFields.push(
                        <Textarea
                            rows="4"
                            id={field.id}
                            label={field.label}
                            name={field.label}
                            defaultValue={this.state.answers[field.id]}
                            onChange={this.handleChange}
                            disabled={field.disabled}
                            required={field.required}
                        />
                    );
                    break;
                case "RADIOBUTTON":
                    allFields.push(
                        <Radiobutton
                            id={field.id}
                            label={field.label}
                            name={field.label}
                            onChange={this.radiobuttonHandleChange}
                            disabled={field.disabled}
                            required={field.required}
                            options={field.options}
                        />
                    );
                    break;
                case "CHECKBOX":
                    allFields.push(
                        <Checkbox
                            id={field.id}
                            label={field.label}
                            defaultChecked={this.state.answers[field.id]}
                            onChange={this.checkboxHandleChange}
                            disabled={field.disabled}
                        />
                    );
                    break;
                case "COMBOBOX":
                    allFields.push(
                        <Combobox
                            id={field.id}
                            label={field.label}
                            name={field.label}
                            defaultValue={this.state.answers[field.id]}
                            onChange={this.handleChange}
                            disabled={field.disabled}
                            required={field.required}
                            options={field.options}
                        />
                    );
                    break;
                case "DATE":
                    allFields.push(
                        <Input
                            id={field.id}
                            type="date"
                            label={field.label}
                            name={field.label}
                            defaultValue={this.state.answers[field.id]}
                            onChange={this.handleChange}
                            disabled={field.disabled}
                            required={field.required}
                        />
                    );
                    break;
            }
        });

        return (
            <div>
                <Header/>
                <div className="container form">
                    <div className="form__body">
                        {allFields}
                        <p className="text-danger">{this.state.error}</p>
                        <div className="buttons">
                            <Button secondary onClick={this.resetForm}>RESET</Button>
                            <Button primary onClick={this.submitForm}>SUBMIT</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionnairePage;