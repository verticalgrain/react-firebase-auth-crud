import React, { Component } from 'react'
import { FormInput } from 'react-form'
import { Creatable } from 'react-select'
import 'react-select/dist/react-select.css'

export default class FormReactSelect extends Component {
  constructor (props) {
    super(props);
    this.state = {
      field: props.field,
      multi: props.multi,
      options: props.options,
    }
  }

  render() {
    return (
      <div>
        <FormInput field={this.state.field}>
          {({ setValue, getValue, setTouched }) => {
            return (
              <Creatable
                field={this.state.field}
                options={this.state.options}
                multi={this.state.multi}
                value={getValue()} 
                onChange={val => setValue(val)} 
                onBlur={() => setTouched()} 
              />
            )
          }}
        </FormInput>
      </div>
    )
  }
}
