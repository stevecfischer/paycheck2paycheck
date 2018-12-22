'use strict';

var envvar = require('envvar');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');
var creds = require('./secrets');

var APP_PORT= creds.APP_PORT;
var PLAID_CLIENT_ID= creds.PLAID_CLIENT_ID;
var PLAID_SECRET= creds.PLAID_SECRET;
var PLAID_SECRET_SAND= creds.PLAID_SECRET_SAND;
var PLAID_PUBLIC_KEY= creds.PLAID_PUBLIC_KEY;
var PLAID_ENV = creds.PLAID_ENV;

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = "";
var PUBLIC_TOKEN = "";
var ITEM_ID = "";

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (request, response, next) {
  response.render('index.ejs', {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
  });
});

app.post('/get_access_token', function (request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      prettyP
      // var msg = 'Could not exchange public_token!';
      // console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: error,
      });
    }

    response.json({
      'access_token': tokenResponse.access_token,
      'item_id': tokenResponse.item_id
    });
  });
});

app.get('/accounts', function (request, response, next) {
  // Retrieve high-level account information and account and routing numbers
  // for each account associated with the Item.
  client.getAuth(ACCESS_TOKEN, function (error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: msg
      });
    }

    response.json({
      error: false,
      accounts: authResponse.accounts,
      numbers: authResponse.numbers,
    });
  });
});

app.post('/item', function (request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    }

    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function (err, instRes) {
      if (err != null) {
        var msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + JSON.stringify(error));
        return response.json({
          error: msg
        });
      } else {
        response.json({
          item: itemResponse.item,
          institution: instRes.institution,
        });
      }
    });
  });
});

app.post('/transactions', function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function (error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    }
    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
    response.json(transactionsResponse);
  });
});

app.post('/accounts/balance/get', function (request, response, next) {
  ACCESS_TOKEN = request.body.access_token;
  client.getBalance(ACCESS_TOKEN, function (err, result) {
    if (err != null) {
      return response.json({
        error: err
      });
    }

    response.json(result.accounts);
  });
});

var server = app.listen(APP_PORT, function () {
  console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});
