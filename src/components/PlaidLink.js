import React, { Component } from 'react';
import PlaidLinkAPI from 'react-plaid-link';
import axios from 'axios';

export default class PlaidLink extends Component {

  componentDidMount(){
    axios
      .post(`http://localhost:8000/get_access_token`, {
        public_token: "public-development-5da1adac-9016-45b1-94fa-4d4d7adc80b1"
      })
      .then(res => {
        const {access_token, item_id} = res.data;
        console.log(res, "res");
        this.props.setPlaidTokens(res.data);
        // get access token and send it to balance
        // axios
        //   .post(`http://localhost:8000/accounts/balance/get`, {
        //     token,
        //     metadata,
        //   })
        //   .then(res => {
        //     console.log(res, 'res');
        //     console.log(res.data);
        //   });
      });
  }

  handleOnSuccess(token, metadata) {
    // send token to client server
    console.log(token, 'token'); //public-sandbox-a0e872ee-392f-435d-bae3-65663e57f4dc
    console.log(metadata, 'metadata'); // {}

  }

  handleOnExit(x, y) {
    // handle the case when your user exits Link
    console.log(x, 'x');
    console.log(y, 'y');
  }

  render() {
    return (
      <PlaidLinkAPI
        clientName="Your app name"
        env="development"
        product={['auth', 'transactions']}
        publicKey="14e48ac5877fcfe22503f1f09aa1c8"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Open Link and connect your bank!
      </PlaidLinkAPI>
    );
  }
}

PlaidLink.displayName = 'PlaidLink';
