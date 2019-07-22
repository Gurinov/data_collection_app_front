import React from "react";
import Header from "../../basic_components/header/Header";
import Input from "../../basic_components/input/Input";
import {Button} from "bootstrap-4-react";
import UserService from "../../../service/UserService";
import is from "is_js";

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            currentPasswordError: "",
            newPasswordError: "",
            confirmNewPasswordError: ""
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

        UserService.findUserByToken().then(
            (response) => {
                console.log(response.data)
                this.setState({
                    email: !!response.data.email ? response.data.email : "",
                    firstName: !!response.data.firstName ? response.data.firstName : "",
                    lastName: !!response.data.lastName ? response.data.lastName : "",
                    phone: !!response.data.phone ? response.data.phone : "",
                    emailError: ""
                })
            },
            (error) => {
                UserService.logoout();
                this.props.history.push('/');
            }
        );
    }

    handleChange(event) {
        if (event) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    submitForm() {
        if (this.isValidForm()) {
            UserService.changePassword(this.state.currentPassword, this.state.newPassword).then(
                (response) => {
                    this.props.history.push('/fields/');
                },
                (error) => {
                    this.setState({newPasswordError: "Invalid password"});
                }
            );
        }

    }

    isValidForm() {
        if (this.state.currentPassword.length < 1) {
            this.setState({currentPasswordError: 'Required field'});
            return false;
        } else {
            this.setState({currentPasswordError: ''});
        }

        if (this.state.newPassword.length < 1) {
            this.setState({newPasswordError: 'Required field'});
            return false;
        } else {
            this.setState({newPasswordError: ''});
        }

        if (this.state.confirmNewPassword.length < 1) {
            this.setState({confirmNewPasswordError: 'Required field'});
            return false;
        } else {
            this.setState({confirmNewPasswordError: ''});
        }
        if (this.state.confirmNewPassword !== this.state.newPassword) {
            this.setState({confirmNewPasswordError: 'Passwords do not match'});
            return false;
        } else {
            this.setState({confirmNewPasswordError: ''});
        }

        return true;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container form">
                    <div className="form__body">
                        <div className="form_body__element">
                            <Input name="currentPassword" label="Current Password"
                                   onChange={this.handleChange} error={this.state.currentPasswordError} required/>
                        </div>
                        <div className="form_body__element">
                            <Input name="newPassword" type="password" label="New Password"
                                   onChange={this.handleChange} error={this.state.newPasswordError} required/>
                        </div>
                        <div className="form_body__element">
                            <Input name="confirmNewPassword" type="password" label="Confirm NewPassword"
                                   onChange={this.handleChange} error={this.state.confirmNewPasswordError} required/>
                        </div>
                        <div className="form_body__element form__label">
                            <Button primary onClick={this.submitForm}>Change</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;