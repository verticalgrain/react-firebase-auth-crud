import React, { Component } from 'react';
import { ref } from '../config/constants'
import { firebaseAuth } from '../config/constants'
import * as firebase from 'firebase';

class Item extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.params.itemid,
      title: 'loading',
      text: 'loading',
    };
    this.theItem = ref.child('items/'+this.state.id);

    this.removeItem = this.removeItem.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);

  }

  itemChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdateItem(e) {
    e.preventDefault();
    console.log('attempting to update')
    // if (this.state.title && this.state.title.trim().length !== 0) {
    this.theItem.update(this.state);
    // }

  }

  removeItem(key){
    this.theItem.remove();
  }

  componentDidMount = () =>  {
    const item = {};

    this.theItem.on('value', dataSnapshot => {

      dataSnapshot.forEach(function(childSnapshot) {
        item[childSnapshot.key] = childSnapshot.val()
      });
      
      this.setState({
        title: item['title'],
        text: item['text']
      })

    })

  }

  render(){
    var _this = this;

    return (
        <div>
          <form onSubmit={ this.handleUpdateItem }>
            <label htmlFor={'title' + this.state.id}>Title </label>
            <input
              id={'title' + this.state.id}
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.itemChange}
            />
            <br/>
            <label htmlFor={'text' + this.state.id}>Text </label>
            <textarea
              id={'text' + this.state.id}
              type="textarea"
              name="text"
              value={this.state.text}
              onChange={this.itemChange}
            />
            <br/>
            <button>Save</button>
          </form>
          <a onClick={ _this.removeItem.bind(null, this.state.id) }>Delete</a>
        </div>
    );
  }
}

export default Item;