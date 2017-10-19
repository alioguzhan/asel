import React from 'react'
import axios from 'axios'
import shortid from 'shortid'

export default class SignupForm extends React.Component {
    constructor() {
        super()
        this.state = {
            countries: [],
            name: '',
            email: '',
            country: '',
            password: '',
            password2: '',
            loading: false
        }
        this.countryChange = this.countryChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        axios.get('/api/countries').then(resp => {
            this.setState({ countries: resp.data })
        }).catch(err => {
            console.log(err)
        })
    }
    countryChange(evt) {
        console.log(evt.target.value)
        const country = this.state.countries.filter(e => e.id == evt.target.value)
        if (!country) return
        this.setState({ country: evt.target.value })
    }

    handleSubmit() {
        let { countries, country, loading, ...data } = this.state
        // check if country selected
        const countryStr = this.state.countries.filter(e => e.id == this.state.country)
        if (!countryStr) return
        
        const { name,email,password,password2 } = this.state;
        // check if other fields are filled
        if (!name.trim() || !password || !password2 || !email.trim()) return

        // check if e-mail is valid.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('E-Mail is not valid')

        // check if passwords match
        if (password !== password2) return alert('Passwords don\'t match')
        
        
        
        this.setState({ loading: true })
        axios.post('/signup',
            { ...data, country: countryStr[0].country_name }).then(resp => {
                this.setState({ loading: false })
                if (resp.data.error) return alert(resp.data.error)
                window.location.href = resp.data.next
            }).catch(err => {
                this.setState({ loading: false }, () => {
                    alert(`${err.message} -> ${err.response.statusText}`)
                })
            })
    }
    
    componentDidCatch(err, info) {
        alert(err.toString())
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
                {this.state.loading ?
                    (<i className="fa fa-refresh fa-spin fa-3x fa-fw" style={{fontSize: "5em", color:"#7f7878"}}></i>)
                    :
                (<div className="form">
                    <div className="md-form">
                        <input type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })}
                            id="orangeForm-name" className="form-control" placeholder="Your Name" name="name" />
                    </div>
                    <div className="md-form">
                        <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} id="orangeForm-email" className="form-control" placeholder="Your E-Mail" name="email" />
                    </div>
                    <div className="md-form md-form-select">
                        <label>Your Country</label>
                        <select name="country" value={this.state.country || -1} onChange={this.countryChange} id="countries" className="form-control" name="country">
                            {[<option disabled key={shortid.generate()} value={-1}>-</option>, ...countries]}
                        </select>
                    </div>
                    <div className="md-form">
                        <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} id="orangeForm-pass" className="form-control" placeholder="Your Password" name="password" />
                    </div>
                    <div className="md-form">
                        <input type="password" value={this.state.password2} onChange={e => this.setState({ password2: e.target.value })} id="orangeForm-pass-2" className="form-control" placeholder="Your Password (Again)" name="password2" />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-info" onClick={this.handleSubmit}>Sign Up</button>
                    </div>
                </div>)}
            </div>
        )
    }
}