import React from "react";
import Logo from "../../basic_components/logo/Logo";
import Input from "../../basic_components/input/Input";
import {Link} from "react-router-dom";
import {Button} from "bootstrap-4-react";
import UserService from "../../../service/UserService";
import is from "is_js";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phone: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: ""
        };
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isValidForm = this.isValidForm.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
        this.isValidConfirmPassword = this.isValidConfirmPassword.bind(this);
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
            UserService.signup(this.state.email, this.state.password, this.state.firstName, this.state.lastName, this.state.phone).then(
                (response) => {
                    this.props.history.push('/login')
                },
                (error) => {
                    this.setState({emailError: error.response.data});
                }
            );
        }

    }

    isValidForm() {
        return this.isValidEmail(this.state.email) &
            this.isValidPassword(this.state.password) &
            this.isValidConfirmPassword(this.state.confirmPassword);
    }

    isValidPassword(password) {
        if (password.length < 1) {
            this.setState({passwordError: 'Required field'});
            return false;
        }
        this.setState({
            passwordError: ''
        });
        return true;
    }

    isValidConfirmPassword(password) {
        if (password !== this.state.password || password.length < 1) {
            this.setState({confirmPasswordError: 'Passwords do not match'});
            return false;
        }
        this.setState({
            confirmPasswordError: ''
        });
        return true;
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
            <div className="container form">
                <div className="form__body">
                    <div className="form_body__element">
                        <Logo/>
                    </div>
                    <div className="form_body__element">
                        <p>Sign Up</p>
                    </div>
                    <div className="form_body__element">
                        <Input name="email" type="email" placeholder="Email"
                               onChange={this.handleChange} error={this.state.emailError} required/>
                    </div>
                    <div className="form_body__element">
                        <Input name="password" type="password" placeholder="Password"
                               onChange={this.handleChange} error={this.state.passwordError} required/>
                    </div>
                    <div className="form_body__element">
                        <Input name="confirmPassword" type="password" placeholder="Confirm Password"
                               onChange={this.handleChange} error={this.state.confirmPasswordError} required/>
                    </div>
                    <div className="form_body__element">
                        <Input name="firstName" placeholder="First Name" onChange={this.handleChange}/>
                    </div>
                    <div className="form_body__element">
                        <Input name="lastName" placeholder="Last Name" onChange={this.handleChange}/>
                    </div>
                    <div className="form_body__element">
                        <Input name="phone" placeholder="Phone Number" onChange={this.handleChange}/>
                    </div>
                    <div className="form_body__element">
                        <Button primary block onClick={this.submitForm}>Sign Up</Button>
                    </div>
                    <div className="form_body__element">
                        <p className="center_element">
                            Already have account? <span><Link to="/login">Log In</Link></span>
                        </p>
                    </div>
                </div>
            </div>

        );
    }
}

export default Signup;