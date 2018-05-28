import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();

        // calls the passed callback from the parent <App> component.
        this.props.onLogin(e.target.username.value, e.target.password.value);
    };

    render() {
        const validForm = this.state.username && this.state.password.length >= 8;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Enter username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Please enter username..."
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Enter password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Please enter password..."
                        onChange={this.onChange}
                    />
                </div>
                <button
                    disabled={!validForm}
                    className='btn'
                    type='submit'
                > Log in </button>
            </form>
        )
    }
};

export default Login;