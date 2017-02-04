import React, { Component } from 'react'
var Dropzone = require('react-dropzone');

export default class ImageUpload extends Component {
    
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  render() {
    return (
        <div>
          <Dropzone onDrop={this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
    )
  }
}
