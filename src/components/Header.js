import React, { Component, Fragment } from 'react';

export default class Header extends Component {

  render() {

    return (
      <Fragment>
        <h1>{this.props.header}</h1>
        <ul>
          <li>
            <a onClick={this.props.handleOnBalance}>Get Balance</a>
          </li>
        </ul>
      </Fragment>

    );
  }
}
