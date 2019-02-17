import keyGen from 'uniqid';

export default {
  state: {
    isFirebaseConnected: false,
    messages: [],
    access_tokens: [],
    item_id: '',
    currentMonth: 'January',
    headerText: 'My Header',
    dayOfMonth: "",
    remainingAmount: 0,
    currentBalance: {
      balances: {
        available: "0",
      },
    },
    totalExpenses: {
      value: 0,
    },
    incomes: [
      {
        key: keyGen(),
        label: 'First Paycheck',
        amount: 1000,
        monthDay: 1,
      },
      {
        key: keyGen(),
        label: 'Second Paycheck',
        amount: 1000,
        monthDay: 15,
      },
    ],
    expenses: [
      {
        key: keyGen(),
        label: 'Mortgage',
        amount: 400,
        monthDay: 14,
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
        amount: 200,
        monthDay: 23,
      },
      {
        key: keyGen(),
        label: 'MTG allowance',
        amount: 100,
        monthDay: 1,
      },
    ],
  },
};
