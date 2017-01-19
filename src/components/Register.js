import React, { Component } from 'react'
import { auth } from '../helpers/auth'

export default class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value,this.pw.value)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
        <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    )
  }
}