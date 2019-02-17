import React, { Component } from 'react';
import PlaidLinkAPI from './PlaidLinkApi';
import axios from 'axios';

export default class PlaidLink extends Component {
  constructor(props) {
    super(props);

    this.handleOnExit = this.handleOnExit.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  handleOnSuccess(token, metadata) {
    axios
      .post(`/get_access_token`, {
        public_token: token
      })
      .then(res => {
        this.props.setPlaidTokens(res.data);
        this.props.handleOnSuccess(true);
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
        clientName="Your steve name"
        env="sandbox"
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
