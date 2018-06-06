import React, { Component, Fragment } from 'react';
import { currencyFormatter, getExpensesTotal } from '../helpers/utils';

export default class Totals extends Component {

  render() {
    const {
      streamType
    } = this.props;
    const firstHalf = getExpensesTotal(this.props[streamType], 'first');
    const secondHalf = getExpensesTotal(this.props[streamType], 'second');

    return (
      <Fragment>
        <div className="total total--expenses">
          <h2>{this.props.header}</h2>
          <p>first half</p>
          <p>{currencyFormatter(firstHalf)}</p>
          <p>second half</p>
          <p>{currencyFormatter(secondHalf)}</p>
        </div>
      </Fragment>
    );
  }
}

Totals.displayName = 'Totals';
