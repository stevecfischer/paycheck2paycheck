import React, {Fragment} from 'react';
import {currencyFormatter, getRemainingExpenses} from "../helpers/utils";
import * as Moment from 'moment';

const CurrentBalance = (props) => {
  const availableBalance = props.availableBalances;
  const dayOfMonth = Moment().format('D');
  const remainingExpenses = getRemainingExpenses(props.expenses, dayOfMonth);
  const actualBalance = currencyFormatter(( availableBalance - remainingExpenses));

  return (
    <Fragment>
      <div className="total total--expenses">
        <h2>{props.header}</h2>
        <p>Checking Account Balance: {availableBalance}</p>
        <p>Remaining Expenses: {remainingExpenses}</p>
        <p>Actual Balance: {actualBalance}</p>
      </div>
    </Fragment>
  )
}

export default CurrentBalance;
