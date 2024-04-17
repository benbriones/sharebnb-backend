"use strict";

/** Routes for bookings. */

const Booking = require('../models/booking')
const express = require("express");
const { BadRequestError } = require("../expressError");

const router = new express.Router();

/** // yyyy-mm-dd
app.post('/newbooking', async (req, res) => {
  const booking = await Booking.create(
    {guestUsername: "testUser2", propertyId: 1, startDate: "2023-10-30", endDate: "2023-12-20"});
  return res.send({ booking });
})

app.get('/booking', async (req, res) => {
  const booking = await Booking.get(1);
  return res.send({ booking });
}) */



module.exports = router;