const path = require('path');
const express = require('express');
const helmet = require('helmet');
const moment = require('moment');
const plaid = require('plaid');
const creds = require('./secrets');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Plaid API variables
const APP_PORT= creds.APP_PORT;
const PLAID_CLIENT_ID= creds.PLAID_CLIENT_ID;
const PLAID_SECRET= creds.PLAID_SECRET;
const PLAID_SECRET_SAND= creds.PLAID_SECRET_SAND;
const PLAID_PUBLIC_KEY= creds.PLAID_PUBLIC_KEY;
const PLAID_ENV = creds.PLAID_ENV;

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = "";
let PUBLIC_TOKEN = "";
let ITEM_ID = "";

// Initialize the Plaid client
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

const app = express();
const port = process.env.PORT || 5000;
/**
 * we'll use helmet to set some cors and tighten security
 */
app.use(helmet());

/**
 * setup additional cors.
 * we can pass custom to cors() if needed
 */
app.use(cors());

/**
 * due to the way Express v4 works we need to use cookieParser for the jwt cookie
 */
app.use(cookieParser());

/**
 * parses incoming requests with JSON payloads
 */
app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.get('/', function (request, response, next) {
//   response.render('index.ejs', {
//     PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
//     PLAID_ENV: PLAID_ENV,
//   });
// });

app.post('/get_access_token', function (request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      // const msg = 'Could not exchange public_token!';
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

// app.get('/accounts', function (request, response, next) {
//   // Retrieve high-level account information and account and routing numbers
//   // for each account associated with the Item.
//   client.getAuth(ACCESS_TOKEN, function (error, authResponse) {
//     if (error != null) {
//       const msg = 'Unable to pull accounts from the Plaid API.';
//       console.log(msg + '\n' + JSON.stringify(error));
//       return response.json({
//         error: msg
//       });
//     }
//
//     response.json({
//       error: false,
//       accounts: authResponse.accounts,
//       numbers: authResponse.numbers,
//     });
//   });
// });

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
        const msg = 'Unable to pull institution information from the Plaid API.';
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
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
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

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use(function(err, req, res, next) {
  const { message, code } = err;
  res.status(401).send(`message ${message}, code: ${code}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
