import React from "react";
import Input from "../../basic_components/input/Input";
import Logo from "../../basic_components/logo/Logo";
import Checkbox from "../../basic_components/checkbox/Checkbox";
import {Link} from "react-router-dom";
import {Button} from "bootstrap-4-react";
import UserService from "../../../service/UserService";
import is from 'is_js';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            rememberMe: false,
            emailError: "",
            passwordError: ""
        };
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            UserService.signin(this.state.email, this.state.password).then(
                (response) => {
                    UserService.saveToken(response.data);
                    this.props.history.push('/fields');
                },
                (error) => {
                    this.setState({emailError: "Invalid email or password"});
                }
            );
        }
    }

    isValidForm() {
        return this.isValidEmail(this.state.email) & this.isValidPassword(this.state.password);
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
                        <p>Log In</p>
                    </div>
                    <div className="form_body__element">
                        <Input name="email" type="email" placeholder="Email"
                               onChange={this.handleChange} error={this.state.emailError} required/>
                    </div>
                    <div className="form_body__element">
                        <Input name="password" type="password" placeholder="Password"
                               onChange={this.handleChange} error={this.state.passwordError} required/>
                    </div>
                    <div className="form_body__element inline_element">
                        <Checkbox floaat="right" name="Remember me"/>
                        <Link to="/account/forgot-password">Forgot your password?</Link>
                    </div>
                    <div className="form_body__element">
                        <Button primary block onClick={this.submitForm}>Log In</Button>
                    </div>
                    <div className="form_body__element">
                        <p className="center_element">
                            Don't have account? <span><Link to="/signup">Sign Up</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;