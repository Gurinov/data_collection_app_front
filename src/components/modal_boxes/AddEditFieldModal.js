import React from "react";
import {Button, Modal} from "react-bootstrap";
import Input from "../basic_components/input/Input";
import Combobox from "../basic_components/combobox/Combobox";
import Textarea from "../basic_components/textarea/Textarea";
import FieldService from "../../service/FieldService";
import Checkbox from "../basic_components/checkbox/Checkbox";

class AddEditFieldModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modalTitle: this.props.modalTitle,
            field: {
                id: this.props.fieldId ? this.props.fieldId : null,
                label: '',
                type: 'SINGLE_LINE_TEXT',
                required: false,
                active: false,
                options: []
            },
            selectedOptions: [
                {text: 'SINGLE_LINE_TEXT'},
                {text: 'MULTILINE_TEXT'},
                {text: 'RADIOBUTTON'},
                {text: 'CHECKBOX'},
                {text: 'COMBOBOX'},
                {text: 'DATE'}
            ],
            labelError: '',
            optionsError: '',
            optionsText: ''
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setFieldType = this.setFieldType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeOptions = this.handleChangeOptions.bind(this);
        this.onSaveOrEditField = this.onSaveOrEditField.bind(this);
        this.isValidForm = this.isValidForm.bind(this);
        this.isValidLabel = this.isValidLabel.bind(this);
        this.isValidOptions = this.isValidOptions.bind(this);
        this.handleChangeChecked = this.handleChangeChecked.bind(this);
        this.optionsToText = this.optionsToText.bind(this);
    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        if (this.props.fieldId) {
            FieldService.getFieldById(this.props.fieldId).then(
                (response) => {
                    let optionsText = this.optionsToText(response.data.options);
                    console.log(optionsText)
                    console.log(response.data)
                    this.setState({
                        ...this.state,
                        show: true,
                        field: {
                            id: response.data.id,
                            label: response.data.label,
                            type: response.data.type,
                            required: response.data.required,
                            active: response.data.active,
                            options: response.data.options
                        },
                        optionsText: optionsText
                    })
                }
            );
        } else {
            this.setState({show: true});
        }
    }

    optionsToText(options) {
        let optionText = "";
        if (options) {
            options.forEach(option => {
                optionText += "\n" + option.text
            });
        }
        return optionText.trim();
    }

    setFieldType(event) {
        this.setState({
            field: {
                ...this.state.field,
                type: event.target.value
            }
        });
    }

    handleChange(event) {
        if (event) {
            this.setState({
                field: {
                    ...this.state.field,
                    [event.target.name]: event.target.value
                }
            });
        }
    }

    handleChangeChecked = name => event => {
        this.setState({
            field: {
                ...this.state.field,
                [name]: event.target.checked
            }
        });
    };

    onSaveOrEditField() {
        if (this.isValidForm()) {
            if (this.state.field.id == null) {
                FieldService.createField(this.state.field).then(
                    response => {
                        this.setState({
                            modalTitle: this.props.modalTitle,
                            field: {
                                id: null,
                                label: '',
                                type: 'SINGLE_LINE_TEXT',
                                required: false,
                                active: false,
                                options: []
                            },
                            labelError: '',
                            optionsError: '',
                            optionsText: ''
                        });
                        this.props.updateTable();
                    }
                );
            } else {
                console.log("otpravil")
                console.log(this.state.field)
                FieldService.updateField(this.state.field).then(
                    response => {
                        this.props.updateTable();
                    }
                );
            }
            this.setState({show: false});
        }
    }

    isValidForm() {
        return this.isValidLabel(this.state.field.label) && this.isValidOptions(this.state.field.options);
    }

    isValidLabel(label) {
        if (label.length === 0) {
            this.setState({labelError: 'This field is required'});
            return false;
        }
        this.setState({labelError: ''});
        return true;
    }

    isValidOptions(options) {
        if ((this.state.field.type === 'RADIOBUTTON'
            || this.state.field.type === 'COMBOBOX')) {

            if (options.length === 0) {
                this.setState({optionsError: 'This field is required'});
                return false;
            }
        }
        this.setState({optionsError: ''});
        return true;
    }

    handleChangeOptions(event) {
        let options = [];
        event.target.value.split('\n').filter(i => {
            return (i.trim() !== '') ? i : '';
        }).forEach(text => {
            options.push({'text': text})
        });
        this.setState({
            ...this.state,
            field: {
                ...this.state.field,
                options: options
            },
            optionsText: event.target.value
        });
    }

    render() {
        let button;
        let options;
        if (this.state.field.id == null) {
            button =
                <Button variant="primary" onClick={this.handleShow}>
                    <i className="fa fa-plus"/> Add Field
                </Button>
        } else {
            button =
                <i className="fa fa-edit" onClick={this.handleShow}/>
        }
        if (this.state.field.type === 'RADIOBUTTON' || this.state.field.type === 'COMBOBOX') {
            options =
                <div className="row form__element">
                    <div className="col-md-3 text-right">
                        <label htmlFor="label">Options</label><label className="text-danger">*</label>
                    </div>
                    <div className="col-md-7 text-left">
                        <Textarea name="options" rows='4' onChange={this.handleChangeOptions}
                                  defaultValue={this.state.optionsText}
                                  error={this.state.optionsError}/>
                    </div>
                </div>
        }

        return (
            <>
                {button}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row form__element">
                            <div className="col-md-3 text-right">
                                <label htmlFor="label">Label</label><label className="text-danger">*</label>
                            </div>
                            <div className="col-md-7 text-left">
                                <Input name="label" type="text" defaultValue={this.state.field.label}
                                       onChange={this.handleChange} error={this.state.labelError} required/>
                            </div>
                        </div>
                        <div className="row form__element">
                            <div className="col-md-3 text-right">
                                <label htmlFor="label">Type</label><label className="text-danger">*</label>
                            </div>
                            <div className="col-md-7 text-left">
                                <Combobox name="type" onChange={this.setFieldType}
                                          defaultValue={this.state.field.type} options={this.state.selectedOptions}/>
                            </div>
                        </div>
                        {options}
                        <div className="row form__element ">
                            <div className="col-md-6 offset-md-3 checkboxes">
                                <Checkbox
                                    id="required"
                                    label="Required"
                                    defaultChecked={this.state.field.required}
                                    onChange={this.handleChangeChecked('required')}
                                />
                                <Checkbox
                                    id="active"
                                    label="Is Active"
                                    defaultChecked={this.state.field.active}
                                    onChange={this.handleChangeChecked('active')}
                                />
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            CANCEL
                        </Button>
                        <Button variant="primary" onClick={this.onSaveOrEditField}>
                            SAVE
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default AddEditFieldModal;