// eslint-disable-next-line
import React, { Component } from 'react';
import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router'
import Login from './Login'
import Register from './Register'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import logo from '../assets/logo.svg';
import Home from './Home'
import Dashboard from './Dashboard'
import List from './List'
import Create from './Create'
import '../App.css';

function MatchWhenAuthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      authed: false,
      loading: true,
    }
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return (
      <BrowserRouter>
        {({router}) => (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>
                App
              </h2>
              <ul className="nav">
                <li>
                  <Link to="/" className="nav__item">All Items</Link>
                </li>
                <li>
                  <Link to="/create" className="nav__item">Create Item</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="nav__item">Dashboard</Link>
                </li>
                <li>
                  {this.state.authed
                    ? <button
                        onClick={() => {
                          logout()
                          this.setState({authed: false})
                          router.transitionTo('/')
                        }}
                        className="nav__item">Logout</button>
                    : <span>
                        <Link to="/login" className="nav__item">Login</Link> /
                        <Link to="/register" className="nav__item"> Register</Link>
                      </span>}
                </li>
              </ul>
            </div>
            <Match pattern='/' exactly component={Home} />
            <Match pattern='/' exactly component={List} />
            <Match pattern='/create' exactly component={Create} />
            <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
            <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
            <MatchWhenAuthed authed={this.state.authed} pattern='/dashboard' component={Dashboard} />
            <Miss render={() => <h3>Oops, there doesnt seem to be a page here</h3>} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}