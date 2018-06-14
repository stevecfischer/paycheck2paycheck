import keyGen from 'uniqid';

export default {
  state: {
    access_token: 'access-development-7fc59fcb-8237-40ad-a4fa-1ce30ea5d80a',
    item_id: 'yrnNvpVk18iR3ayzzpzBiz3q8oxggKHOMxZBy',
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
