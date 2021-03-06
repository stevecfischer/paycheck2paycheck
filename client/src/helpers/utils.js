/* PRIVATE METHODS */

/* PUBLIC METHODS */
export function currencyFormatter(amount) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return formattedAmount.format(amount);
}

export function getExpensesTotal(streamItems, monthSplit = 'total') {

  const filteredStreamItems = streamItems.filter(i => {
    if (monthSplit === 'first') {
      return i.monthDay <= 14;
    }

    if (monthSplit === 'second') {
      return i.monthDay >= 15;
    }

    return i.monthDay;
  });

  let totalAmount = 0;
  for (let item of filteredStreamItems) {
    totalAmount += parseInt(item.amount, 10);
  }

  return totalAmount;
}

export function getRemainingExpenses(streamItems,dayOfMonth) {

  const filteredStreamItems = streamItems.filter(i => {
    return i.monthDay >= dayOfMonth && i.monthDay <= 14;
  });

  let totalAmount = 0;
  for (let item of filteredStreamItems) {
    totalAmount += parseInt(item.amount, 10);
  }

  return totalAmount;
}


export function getCurrentBalance(accounts) {
  return accounts.filter(i => {
    return i.name === 'Plaid Saving';
  });
}
