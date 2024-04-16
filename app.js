"use strict";

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { putIntoBucket, readObject } = require("./awss3.js");

const app = express();

app.use(cors());
app.use(express.json());

// TODO: add app.use for all routes
// app.use("/auth", authRoutes)



// /** Making a bucket route */
// app.post("/", function (req, res) {
//   const bucketName = req.body.bucketName;
//   createBucket(bucketName);
// });

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;