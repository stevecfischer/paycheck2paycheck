import React, { Component, Fragment } from 'react';
import keyGen from 'uniqid';

// style components/helpers
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// import ReactMoment from 'react-moment';
import * as Moment from 'moment';

// function components
import Streams from './components/Streams';
import Totals from './components/Totals';
import initialState from './initialState';
import Header from './components/Header';
import Gross from './components/Gross';
import PlaidLink from './components/PlaidLink';
import axios from 'axios';
import CurrentBalance from './components/CurrentBalance';
import { getCurrentBalance } from './helpers/utils';
import { firebaseInit } from './firebase';

const styles = theme => ({
  root: {
    flexGrow: 2,
    padding: theme.spacing.unit * 3,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState.state;
  }

  componentDidMount() {
    firebaseInit();

    this.setState({
      dayOfMonth: Moment().format('D'),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  handleInputChange = (stream, expenseKey, e) => {
    const lineItems = this.state[stream];
    const expenseIndex = lineItems.findIndex(c => c.key === expenseKey);
    lineItems[expenseIndex][e.target.name] = e.target.value;

    this.setState({
      [stream]: lineItems,
    });
  };

  handleAddNewItem = streamType => {
    const newStreamList = this.state[streamType];
    newStreamList.push({
      key: keyGen(),
      label: 'Enter new Item',
      amount: 0,
    });
    this.setState({
      [streamType]: newStreamList,
    });
  };

  handleRemoveItem = (streamType, expenseKey) => {
    this.setState({
      [streamType]: this.state[streamType].filter(
        item => item.key !== expenseKey
      ),
    });
  };

  handleOnBalance = () => {
    axios
      .post(`http://localhost:8000/accounts/balance/get`, {
        access_token: this.state.access_token,
      })
      .then(res => {
        const currentBalance = getCurrentBalance(res.data);
        this.setState({
          currentBalance: currentBalance[0],
        });
      });
  };

  setPlainTokens = apiResponse => {
    this.setState({
      access_token: apiResponse.access_token,
      item_id: apiResponse.item_id,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container justify="center" className="Header" spacing={24}>
            <Grid item md={4}>
              <Header
                header="My Money App"
                handleOnBalance={this.handleOnBalance}
              />
              <PlaidLink
                access_token={this.state.access_token || ""}
                setPlaidTokens={this.setPlainTokens}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            className="App root"
            spacing={24}
          >
            <Grid item md={4}>
              <Streams
                header="Incomes"
                stream="incomes"
                expenseItems={this.state.incomes}
                handleOnChange={this.handleInputChange}
                handleAddNewItem={this.handleAddNewItem}
                handleRemoveItem={this.handleRemoveItem}
              />
            </Grid>
            <Grid item md={4}>
              <CurrentBalance
                header="Current State of affairs"
                {...this.state}
              />
              <Totals
                header="Total Income"
                streamType="incomes"
                {...this.state}
              />

              <Gross header="Gross" {...this.state} />

              <Totals
                header="Total Expense"
                streamType="expenses"
                {...this.state}
              />
            </Grid>
            <Grid item md={4}>
              <Streams
                header="Expenses"
                stream="expenses"
                expenseItems={this.state.expenses}
                handleOnChange={this.handleInputChange}
                handleAddNewItem={this.handleAddNewItem}
                handleRemoveItem={this.handleRemoveItem}
              />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
