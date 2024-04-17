"use strict";

/** Routes for properties. */

const express = require("express");
const jsonschema = require("jsonschema");

const Property = require("../models/property");
const { BadRequestError } = require("../expressError");
const  propertySearchSchema  = require("../schemas/propertySearch.json");
const  propertyCreateSchema  = require("../schemas/propertyCreate.json");
const { ensureLoggedIn } = require("../middleware/auth");
const { putIntoBucket } = require("../awss3");
const multer = require('multer');
const Image = require("../models/image");
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

  console.log("1234", propertySearchSchema);
  const validator = jsonschema.validate(
    q,
    propertySearchSchema,
    { required: true }
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const properties = await Property.findAll(q);
  return res.send({ properties });
});

/** POST / { property } =>  { property }
 *
 * property should be { title, address, description, price }
 *
 * Returns {title, address, description, price, owner }
 *
 * Authorization required: logged in user
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {

  // const newReqBody = {...req.body, price: +req.body.price};

  const validator = jsonschema.validate(
    req.body,
    propertyCreateSchema,
    { required: true }
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const data = { ...req.body, owner: res.locals.user.username };

  const property = await Property.create(data);
  return res.status(201).json({ property });
});

// Set up storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Assume you're posting to '/upload'
router.post('/:id/images', upload.array('images', 5), async (req, res) => {
  const propertyId = req.params.id;

  await Promise.all(req.files.map(async(file, idx) => {
    console.log("inside Promise file", file)
    const key = `${file.originalname}-${Date.now()}-${idx}`
    await putIntoBucket(key, file.buffer);
    await Image.create({propertyId: propertyId, key: key})
  }))

  const property = await Property.get(propertyId)
  return res.json({ property })

});

module.exports = router;