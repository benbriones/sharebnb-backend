"use strict";

/** Routes for properties. */

const jsonschema = require("jsonschema");
const express = require("express");

const Property = require( "../models/property");
const { BadRequestError } = require("../expressError");
const { propertySearchSchema } = require("../schemas/propertySearch.json")
// const multer = require('multer');
// const { putIntoBucket, readObject } = require("./awss3.js");

const router = new express.Router();


/** Get specific property
 *
 * Returns { property: { title, address, description, price, owner, images }}
 *   where images is [{ key, caption}, ...]
 *
 * Authorization required: none
 */

router.get('/:id', async (req, res) => {
  const property = await Property.get(req.params.id);
  return res.send({ property });
});

/** Get all properties
 *
 * Can filter on provided search filters:
 *  - minPrice
 *  - maxPrice
 *  - titleLike (will find case-insensitive, partial matches)
 *
 * Returns [{ title, address, description, price, owner }, ...]
 *
 * Authorization required: none
 */

router.get('/', async (req, res) => {
  const q = req.query;
  // arrive as strings from querystring, but we want as ints
  if (q.minPrice !== undefined) q.minPrice = +q.minPrice;
  if (q.maxPrice !== undefined) q.maxPrice = +q.maxPrice;

  const validator = jsonschema.validate(
    q,
    propertySearchSchema,
    {required: true}
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const properties = await Property.findAll(q);
  return res.send({ properties });
});

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