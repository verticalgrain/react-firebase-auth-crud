import React, { Component } from 'react'
import { login, loginOauth } from '../helpers/auth'

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    login(this.email.value, this.pw.value)
  }
  handleClickOauth = (e) => {
    e.preventDefault();
    loginOauth(e.target.id);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="" ref={(email) => this.email = email} placeholder="Email"/>
          <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
          <button type="submit">Login</button>
        </form>
        <button id="google" href="#" className="" onClick={this.handleClickOauth}>Login with Google</button>
        <button id="facebook" href="#" className="" onClick={this.handleClickOauth}>Login with facebook</button>
        <button id="twitter" href="#" className="" onClick={this.handleClickOauth}>Login with twitter</button>

      </div>
    )
  }
}