import React, { Component, Fragment } from 'react';
import { currencyFormatter, getExpensesTotal } from '../helpers/utils';

export default class Gross extends Component {
  render() {
    const totalExpenseFirstHalf = getExpensesTotal(
      this.props.expenses,
      'first'
    );
    const totalExpenseSecondHalf = getExpensesTotal(
      this.props.expenses,
      'second'
    );

    const totalIncomeFirstHalf = getExpensesTotal(this.props.incomes, 'first');
    const totalIncomeSecondHalf = getExpensesTotal(
      this.props.incomes,
      'second'
    );

    const firstHalfGross = totalIncomeFirstHalf - totalExpenseFirstHalf || '';
    const secondHalfGross =
      totalIncomeSecondHalf - totalExpenseSecondHalf || '';

    return (
      <Fragment>
        <div className="total total--expenses">
          <h2>{this.props.header}</h2>
          <p>first half</p>
          <p>{currencyFormatter(firstHalfGross)}</p>
          <p>second half</p>
          <p>{currencyFormatter(secondHalfGross)}</p>
        </div>
      </Fragment>
    );
  }
}

Gross.displayName = 'Gross';
