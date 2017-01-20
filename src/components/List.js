import React, { Component } from 'react'
import { ref } from '../config/constants'
import { firebaseAuth } from '../config/constants'
import { Match, Link } from 'react-router'
import Item from './Item'
import ItemTeaser from './ItemTeaser'

export default class List extends Component {
  constructor (props) {
    super();
    this.state = {
      items: [],
      pathname: props.pathname
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
                <ItemTeaser pathname={_this.state.pathname} dbkey={item['.key']} title={item.title} text={item.text}  />
              </li>
            );
          })}
        </ul>

        <Match pattern={`${_this.state.pathname}/:itemid`} component={Item} />
      
      </div>
    )
  }
}