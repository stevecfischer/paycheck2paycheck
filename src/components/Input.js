import React, { Component, Fragment } from 'react';

export default class Input extends Component {

  render() {
    return (
      <Fragment>
        <label>{this.props.label}</label>
        <input
          type="text"
          name={this.props.name}
          value={this.props.value}
          onChange={(e) => this.props.handleOnChange(e)}
        />
      </Fragment>
    );
  }
}
