import React from 'react';
import {render} from 'react-dom';
import LoginForm from './LoginForm.jsx'
import SignupForm from './SignupForm.jsx'

class App extends React.Component {
  render () {
    return (
      <div className="container">
          <a href="/" className="logo">
            <img src="/static/logo.png" alt="asel" width="126" height="81"/>
          </a>
          <div className="forms">
              <LoginForm/>
              <SignupForm/>
          </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('root'));