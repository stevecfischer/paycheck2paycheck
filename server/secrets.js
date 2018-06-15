const envvar = require('envvar');

export default {
  APP_PORT: 8000,
  PLAID_CLIENT_ID: "5b1c21fb5ab5bd0011ec925f",
  PLAID_SECRET: "27bf2ac9e7d2d4386c4fb11180c128", //dev
  PLAID_SECRET_SAND: "d84c3d28aa8ac76afe808d9c7dc73b", // sand
  PLAID_PUBLIC_KEY: "14e48ac5877fcfe22503f1f09aa1c8",
  PLAID_ENV: envvar.string('PLAID_ENV', 'development'),
}

