import React, { Component } from 'react';
import { ref } from '../config/constants'
import { firebaseAuth } from '../config/constants'

export default class Create extends Component {
  constructor () {
    super();
    this.state = {
      newitemtext : ''
    }
    this.dbItems = ref.child('items');
    this.onNewItemChange = this.onNewItemChange.bind(this);
    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
  }

  handleNewItemSubmit(e) {
    e.preventDefault();
    if (this.state.newitemtext && this.state.newitemtext.trim().length !== 0) {
      this.dbItems.push({
        title: this.state.newitemtext
      });
      this.setState({
        newitemtext: ''
      });
    }
  }

  onNewItemChange(e) {
    this.setState({newitemtext: e.target.value});
  }

  render () {
    return (
      <form onSubmit={ this.handleNewItemSubmit }>
        <input 
          onChange={ this.onNewItemChange } 
          value={ this.state.newitemtext } 
        />
        <button>Add New</button>
      </form>
    )
  }
}