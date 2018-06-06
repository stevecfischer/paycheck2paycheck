import keyGen from 'uniqid';

export default {
  state: {
    currentMonth: 'January',
    headerText: 'My Header',
    remainingAmount: 0,
    totalExpenses: {
      value: 0,
    },
    incomes: [
      {
        key: keyGen(),
        label: 'First Paycheck',
        amount: 10000,
        monthDay: 1,
      },
      {
        key: keyGen(),
        label: 'Second Paycheck',
        amount: 10000,
        monthDay: 15,
      },
    ],
    expenses: [
      {
        key: keyGen(),
        label: 'Mortgage',
        amount: 1250,
        monthDay: 15,
      },
      {
        key: keyGen(),
        label: 'Water',
        amount: 50,
        monthDay: 9,
      },
      {
        key: keyGen(),
        label: 'Car Payment',
        amount: 400,
        monthDay: 23,
      },
      {
        key: keyGen(),
        label: 'MTG allowance',
        amount: 1000,
        monthDay: 1,
      },
    ],
  },
};
