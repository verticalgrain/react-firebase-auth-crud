import React, { Component } from 'react'
import { login } from '../helpers/auth'

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    login(this.email.value, this.pw.value)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="" ref={(email) => this.email = email} placeholder="Email"/>
        <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
        <button type="submit">Login</button>
      </form>
    )
  }
}