import express from "express";
import { NotFoundError } from "./expressError.js";
import { add } from "./add.js";
import {createBucket, putIntoBucket, readObject} from "./awss3.js"
// import { createBucket } from "./awss3.js";


const app = express();
app.use(express.json());

/** Making a bucket route */
app.post("/", function (req, res) {
  const bucketName = req.body.bucketName;
  createBucket(bucketName);
});

/** get a bucket */
app.get("/", function (req, res, next) {
  const bucketName = req.body.bucketName;
  const key = req.body.key;

  const readBucket = readObject; // TODO: change this
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  /* istanbul ignore next (ignore for coverage) */
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;