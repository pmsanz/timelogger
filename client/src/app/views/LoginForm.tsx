import React from 'react';
import './LoginForm.css';

interface LoginViewState {
    username: string;
    password: string;
}

class LoginForm extends React.Component<{}, LoginViewState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        } as Pick<LoginViewState, keyof LoginViewState>);
    }

    handleSubmit = () => {
        // Handle the submission logic here
        console.log(this.state);
    }

    render() {
        return (
            <div className="login-container">
                <h2>Welcome back!</h2>
                <div className="login-box">
                    <label>User:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />

                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />

                    <button onClick={this.handleSubmit}>Login</button>
                    <p><a href="#">Forgot password?</a></p>
                </div>
            </div>
        );
    }
}

export default LoginForm;
