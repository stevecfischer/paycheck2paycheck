import React, {Component, Fragment} from 'react';
import {currencyFormatter, getRemainingExpenses} from "../helpers/utils";

export default class CurrentBalance extends Component {

  render() {
    const { available } = this.props.currentBalance.balances;
    const availableBalance = available;
    const remainingExpenses = getRemainingExpenses(this.props.expenses,this.props.dayOfMonth);
    const actualBalance = currencyFormatter(( availableBalance - remainingExpenses));

    return (
      <Fragment>
        <div className="total total--expenses">
          <h2>{this.props.header}</h2>
          <p>Checking Account Balance: {availableBalance}</p>
          <p>Remaining Expenses: {remainingExpenses}</p>
          <p>Actual Balance: {actualBalance}</p>
        </div>
      </Fragment>
    );
  }
}

CurrentBalance.displayName = 'CurrentBalance';
