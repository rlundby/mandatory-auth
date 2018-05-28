import React, { Component } from 'react';

import AuthService from './authService';
import Login from './Login';

class App extends Component {
    // get the initial state from AuthService. 
    state = AuthService.getAuthState();
    error = '';
    // ...

    login = (username, password) => {
        // login the user with the given credentials and update the component state upon success or failure respectively.
        AuthService.login({username, password})
            .then(() => {
                this.setState(AuthService.getAuthState());
            })
            .catch(error => {
                this.error = `${error}`;
                console.log(this.error);
            })
    };

    logout = () => {
        // logout the user and update the component with state given by AuthService.
        console.log('help');
        AuthService.logout()
            .then(console.log('hej'));

        this.setState(AuthService.getAuthState());
    };

    testApi() {
        // test access to a protected API route and log the results.

        AuthService.getResource('friends')
            .then((response) => {
                console.log('friends: ', response)
            })
            .catch(error => {
                console.log('error message: ', error)
            })
    }

    getState = () => {
        console.log(this.state);
    };


    // ...

    render() {
        // complete the JSX code below to show the proper markup depending on whether or not the user has been authenticated.

        return (
            this.state
            ?
                (
            <div className="container">



                <div className="status">
                    <span>User ID: {this.state.name || 'No user'} </span>
                    <button onClick={this.testApi}>Test API</button>
                    <button onClick={this.logout}>Logout</button>
                </div>
                <button onClick={this.getState}>Get State</button>
            </div>
                ) : (
                <div>
                    {this.error ? <p className="error">Invalid user credentials</p> : <p></p>}
                    <Login onLogin={this.login} />
                </div>

                )
        );
    }
}

export default App;