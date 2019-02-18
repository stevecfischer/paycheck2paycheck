import React, { Fragment } from 'react';
import { currencyFormatter, getExpensesTotal } from '../helpers/utils';

const Totals = (props) => {
  const { streamType } = props;
  const firstHalf = getExpensesTotal(props[streamType], 'first');
  const secondHalf = getExpensesTotal(props[streamType], 'second');

  return (
    <Fragment>
      <div className="total total--expenses">
        <h2>{props.header}</h2>
        <p>first half</p>
        <p>{currencyFormatter(firstHalf)}</p>
        <p>second half</p>
        <p>{currencyFormatter(secondHalf)}</p>
      </div>
    </Fragment>
  );
};

export default Totals;
