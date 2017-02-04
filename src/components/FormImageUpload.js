import React, { Component } from 'react'
var Dropzone = require('react-dropzone');
import { FormInput } from 'react-form'

export default class FormImageUpload extends Component {
  constructor (props) {
    super(props);
    this.state = {
      field: props.field
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  render() {
    return (
        <div>
          <FormInput field={this.state.field}>
            {({ onDrop }) => {
              return (
                <Dropzone onDrop={this.onDrop}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
              )
            }}
          </FormInput>
        </div>
    )
  }
}
