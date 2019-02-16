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
import firebaseInit from './helpers/firebaseSetup';

// import { firebaseInit , pushState} from './firebase';

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

    // firebaseInit();
  }

  componentWillMount() {
    firebaseInit.bindCollection('access_tokens', {
      context: this,
      state: 'access_tokens',
    });
  }

  componentDidMount() {
    this.setState({
      dayOfMonth: Moment().format('D'),
    });
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
      .post(`/accounts/balance/get`, {
        access_token: this.state.access_tokens[0].access_token,
      })
      .then(res => {
        // returns array of accounts. each account has a balances key
        const currentBalance = getCurrentBalance(res.data);
        this.setState({
          currentBalance: currentBalance[0],
        });
      });
  };

  setPlaidTokens = apiResponse => {
    firebaseInit.addToCollection('access_tokens', {
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
                header="FISCHERS Money App"
                handleOnBalance={this.handleOnBalance}
              />
              <PlaidLink
                setPlaidTokens={this.setPlaidTokens}
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
