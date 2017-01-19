import React, { Component } from 'react'
import { ref } from '../config/constants'
import { firebaseAuth } from '../config/constants'
import UpdateableItem from './UpdateableItem'

export default class List extends Component {
  constructor () {
    super();
    this.state = {
      items: []
    }
    this.dbItems = ref.child('items');
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.dbItems.on('value', dataSnapshot => {
      var items = [];

      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      });

      this.setState({
        items: items
      });
    });
  }

  componentWillUnmount() {
    this.dbItems.off();
  }

  removeItem(key){
    this.dbItems.child(key).remove();
  }

  render () {
    var _this = this;

    return (
      <div>
        <ul>
          {this.state.items.map(function(item) {
            return ( 
              <li key={ item['.key'] }>
                <UpdateableItem dbkey={item['.key']} title={item.title} text={item.text}  />
                <a onClick={ _this.removeItem.bind(null, item['.key']) } style={{cursor: 'pointer', color: 'red'}}>Delete</a>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}