import React from 'react';
import axios from 'axios'

export default class LoginForm extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            email: '',
            password: ''
        }

    }

    handleSubmit = () => {
        const email = this.state.email.trim()
        const password = this.state.password.trim()
        if (!email || !password) return
        this.setState({ loading: true })
        axios.post('/login', { email: email, password: password }).then(resp => {
            this.setState({ loading: false }) // not required may be ???? -- ali
            if (resp.data.error) return alert(resp.data.error)
            window.location.href = resp.data.next
        }).catch(err => {
            this.setState({ loading: false }, () => {
                alert(`${err.message} -> ${err.response.statusText}`)
            })
        })
    }

    componentDidCatch(err, info) {
        alert(err, info)
    }

    render() {
        return (
            <div className="login-form">
                <h2>Already Have an Account?</h2>
                {this.state.loading ?
                    (<i className="fa fa-refresh fa-spin fa-3x fa-fw" style={{fontSize: "5em", color:"#7f7878"}}></i>)
                    :
                    (<div className="form">
                        <div className="md-form">
                            <input type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}
                                id="defaultForm-email" className="form-control" placeholder="E-Mail" name="email" />
                        </div>
                        <div className="md-form">
                            <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}
                                id="defaultForm-pass" className="form-control" name="password" placeholder="Password" />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-info" onClick={this.handleSubmit}>Log in</button>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}