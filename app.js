"use strict";

const express = require("express");
const multer = require('multer');
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { putIntoBucket, readObject } = require("./awss3.js");

const app = express();

app.use(cors());
app.use(express.json());

// TODO: add app.use for all routes
// app.use("/auth", authRoutes)

// Set up storage engine
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Assume you're posting to '/upload'
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.body); // Access text fields of form
  console.log("*********req.file", req.file); // Access file details

  const data = await putIntoBucket("testKey5", req.file.buffer);
  console.log("data", data);
  res.send('File uploaded and data received');
});


// /** Making a bucket route */
app.get("/data", function (req, res) {
  readObject("testKey4");
});

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