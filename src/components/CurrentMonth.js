import React, { Component, Fragment } from 'react';

export default class CurrentMonth extends Component {
  render() {
    const {
      currentMonth
    } = this.props;

    return (
      <Fragment>
        <select ref={(input) => this.selectVal = input} onChange={this.props.handleCurrentMonthSelect}>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
        <p>{currentMonth}</p>

      </Fragment>
    );
  }
}

CurrentMonth.displayName = 'CurrentMonth';
