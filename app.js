"use strict";

const express = require("express");
const multer = require('multer');
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { putIntoBucket, readObject } = require("./awss3.js");

const app = express();

 const Property  = require( "./models/property.js");

app.use(cors());
app.use(express.json());

// TODO: add app.use for all routes
// app.use("/auth", authRoutes)

// Set up storage engine
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Assume you're posting to '/upload'
app.post('/upload', upload.single('file'), async (req, res) => {
  // console.log("*********req.file", req.file); // Access file details

  const data = await putIntoBucket("testKey70", req.file.buffer);
  res.send('File uploaded and data received');
});


// app.get('/property', async (req, res) => {
//   const properties = await Property.findAll({titleLike: "O"});
//   return res.send({ properties });

// });

app.get('/property', async (req, res) => {
  const property = await Property.get(3);
  return res.send({ property });
});


// /** Making a bucket route */
app.get("/data", async function (req, res) {
  await readObject("testKey5");
  res.send("hello");
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