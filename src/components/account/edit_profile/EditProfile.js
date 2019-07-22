import React from "react";
import Header from "../../basic_components/header/Header";
import Input from "../../basic_components/input/Input";
import {Button} from "bootstrap-4-react";
import UserService from "../../../service/UserService";
import is from "is_js";

class EditProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            emailError: ""
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
        if (this.isValidEmail(this.state.email)) {
            UserService.editProfile(this.state.email, this.state.firstName, this.state.lastName, this.state.phone).then(
                (response) => {
                    this.props.history.push('/fields/');
                },
                (error) => {
                    this.setState({emailError: "Invalid email"});
                }
            );
        }

    }

    isValidEmail(email) {
        if (!is.email(email)) {
            this.setState({emailError: 'Invalid email'});
            return false;
        }
        this.setState({
            emailError: ''
        });
        return true;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container form">
                    <div className="form__body">
                        <div className="form__label">
                            <p>Edit Profile</p>
                        </div>
                        <div className="form_body__element">
                            <Input name="firstName" label="First Name" value={this.state.firstName} onChange={this.handleChange}/>
                        </div>
                        <div className="form_body__element">
                            <Input name="lastName" label="Last Name" value={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                        <div className="form_body__element">
                            <Input name="email" type="email" label="Email" value={this.state.email}
                                   onChange={this.handleChange} error={this.state.emailError} required/>
                        </div>
                        <div className="form_body__element">
                            <Input name="phone" label="Phone Number" value={this.state.phone} onChange={this.handleChange}/>
                        </div>
                        <div className="form_body__element form__label">
                            <Button primary onClick={this.submitForm}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;