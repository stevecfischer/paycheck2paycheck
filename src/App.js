import React, { Component, Fragment } from 'react';
import keyGen from 'uniqid';

// firebase depends
import FirebaseAuth from 'react-firebaseui';
import Firebase from 'firebase';

// style components/helpers
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// function components
import Streams from './components/Streams';
import Totals from './components/Totals';
import initialState from './initialState';
import Header from './components/Header';
import Gross from './components/Gross';

const styles = theme => ({
  root: {
    flexGrow: 1,
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

  componentDidMount(){
    console.log(this.props, "");
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps, "nextProps");
    console.log(nextState, "nextState");
    return true;
  }

  handleInputChange = (stream, expenseKey, e) => {
    const lineItems = this.state[stream];
    const expenseIndex = lineItems.findIndex((c) => c.key === expenseKey);
    lineItems[expenseIndex][e.target.name] = e.target.value;

    this.setState({
      [stream]: lineItems,
    });
  };

  handleAddNewItem = (streamType) => {
    const newStreamList = this.state[streamType];
    newStreamList.push({
      key: keyGen(),
      label: 'Enter new Item',
      amount: 0,
    });
    this.setState({
      [streamType]: newStreamList,
    })
  };

  handleRemoveItem = (streamType, expenseKey) =>{
    this.setState({
      [streamType] : this.state[streamType].filter((item) => item.key !== expenseKey)
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container justify="center" className="Header" spacing={24}>
            <Grid item md={4}>
              <Header header="My Money App" />
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
              <Totals
                header="Total Income"
                streamType='incomes'
                {...this.state}
              />

              <Gross header='Gross' {...this.state} />

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
