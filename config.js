"use strict";

require("dotenv").config();

const PORT = +process.env.PORT || 3001;

const AWS_REGION = process.env.AWS_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "postgresql:///sharebnb_test"
      : process.env.DATABASE_URL || "postgresql:///sharebnb";
}

module.exports = {
  PORT,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY
};