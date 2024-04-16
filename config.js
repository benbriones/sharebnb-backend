"use strict";

require("dotenv").config();

const PORT = +process.env.PORT || 3001;

const AWS_REGION = process.env.AWS_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

module.exports = {
  PORT,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY
};