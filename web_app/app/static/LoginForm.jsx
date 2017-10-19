import React from 'react';

export default class LoginForm extends React.Component {
    render() {
        return (
            <div className="login-form">
                <h2>Already Have an Account?</h2>
                {/* Form login */}
                <form action="/login" method="post">
                    <div className="md-form">
                        <input type="text" id="defaultForm-email" className="form-control" placeholder="E-Mail" name="email" />
                    </div>
                    <div className="md-form">
                        <input type="password" id="defaultForm-pass" className="form-control" name="password" placeholder="Password"/>
                    </div>
                    <div className="text-center">
                        <input type="submit" className="btn btn-default" value="Login"/>
                    </div>
                </form>
                {/* Form login */}
            </div>
        )
    }
}