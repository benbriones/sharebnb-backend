"use strict";

const Property = require( "../models/property");
const express = require("express");
const { BadRequestError } = require("../expressError");
// const multer = require('multer');
// const { putIntoBucket, readObject } = require("./awss3.js");

const router = new express.Router();

/** app.get('/property', async (req, res) => {
  const property = await Property.get(3);
  return res.send({ property });
}); */

// Set up storage engine
// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// // Assume you're posting to '/upload'
// app.post('/upload', upload.single('file'), async (req, res) => {
//   // console.log("*********req.file", req.file); // Access file details

//   const data = await putIntoBucket("testKey70", req.file.buffer);
//   res.send('File uploaded and data received');
// });

module.exports = router;