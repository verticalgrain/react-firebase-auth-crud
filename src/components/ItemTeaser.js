import React, { Component } from 'react';
import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router'

class Item extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.dbkey,
      title: props.title,
      text: props.text,
      pathname: props.pathname
    };
    
  }

  render(){
    return (
      <div className="{this.state.id}">
        <pre>{JSON.stringify(this.state.id, null, 2)}</pre>
        <Link to={`${this.state.pathname}/${this.state.id}`}>{this.state.title}</Link>
        <div>{ this.state.title }</div>
        <br/>
        <div>{ this.state.text }</div>
      </div>
    );
  }
}


export default Item;