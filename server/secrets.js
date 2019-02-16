const envvar = require("envvar");

let secret;
if (process.env.NODE_ENV === "production") {
  secret = "27bf2ac9e7d2d4386c4fb11180c128"; //dev
} else {
  secret = "d84c3d28aa8ac76afe808d9c7dc73b"; // sand
}

const configs = {
  APP_PORT: 5000,
  PLAID_CLIENT_ID: "5b1c21fb5ab5bd0011ec925f",
  PLAID_SECRET: secret,
  PLAID_PUBLIC_KEY: "14e48ac5877fcfe22503f1f09aa1c8",
  PLAID_ENV: envvar.string("PLAID_ENV", "sandbox"),
  SANDBOX_USERNAME: "user_good",
  SANDBOX_PASS: "pass_good",
};

module.exports = configs;
