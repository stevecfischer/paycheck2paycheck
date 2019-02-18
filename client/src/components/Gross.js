import React, {Fragment } from 'react';
import { currencyFormatter, getExpensesTotal } from '../helpers/utils';

const Gross = (props) => {
    const totalExpenseFirstHalf = getExpensesTotal(
      props.expenses,
      'first'
    );
    const totalExpenseSecondHalf = getExpensesTotal(
      props.expenses,
      'second'
    );

    const totalIncomeFirstHalf = getExpensesTotal(props.incomes, 'first');
    const totalIncomeSecondHalf = getExpensesTotal(
      props.incomes,
      'second'
    );

    const firstHalfGross = totalIncomeFirstHalf - totalExpenseFirstHalf || '';
    const secondHalfGross =
      totalIncomeSecondHalf - totalExpenseSecondHalf || '';

    return (
      <Fragment>
        <div className="total total--expenses">
          <h2>{props.header}</h2>
          <p>first half</p>
          <p>{currencyFormatter(firstHalfGross)}</p>
          <p>second half</p>
          <p>{currencyFormatter(secondHalfGross)}</p>
        </div>
      </Fragment>
    );
};

export default Gross
