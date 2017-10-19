import React from 'react'
import axios from 'axios'
import shortid from 'shortid'

export default class SignupForm extends React.Component {
    constructor() {
        super()
        this.state = {
            countries: []
        }
    }
    componentDidMount() {
        axios.get('/api/countries').then(resp => {
            this.setState({ countries: resp.data })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        const countries = this.state.countries.map(elm => {
            return (
                <option key={shortid.generate()} value={elm.id}>{elm.country_name}</option>
            )
        })
        return (
            <div className="signup-form">
                <h2>Create New Account</h2>
                {/* Form register */}
                <form action="/signup" method="post">
                    <div className="md-form">
                        <input type="text" id="orangeForm-name" className="form-control" placeholder="Your Name" name="name" />
                    </div>
                    <div className="md-form">
                        <input type="text" id="orangeForm-email" className="form-control" placeholder="Your E-Mail" name="email" />
                    </div>
                    <div className="md-form md-form-select">
                         <label>Your Country</label>
                        <select name="country" id="countries" className="form-control" name="country">
                            {countries}
                        </select> 
                    </div>
                    <div className="md-form">
                        <input type="password" id="orangeForm-pass" className="form-control" placeholder="Your Password" name="password"/>
                    </div>
                    <div className="md-form">
                        <input type="password" id="orangeForm-pass-2" className="form-control" placeholder="Your Password (Again)" name="password2" />
                    </div>
                    <div className="text-center">
                    <input type="submit" className="btn btn-default" value="Sign Up"/>
                    </div>
                </form>
                {/* Form register */}
            </div>
        )
    }
}