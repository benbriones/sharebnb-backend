"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");


/** Related functions for bookings */

/** Methods:
 *
 * Create
 * ValidateBooking (for timeframes)
 * GetAllBookings
 * GetSingleBooking
 * Delete
 */

class Booking {
  /**
   *
   */

  static async _validateBooking({ propertyId, startDate, endDate }) {
    const result = await db.query(`
        SELECT id,
               start_date AS "startDate",
               end_date AS "endDate"
        FROM bookings
        WHERE property_id = $1
          AND ((start_date BETWEEN $2 AND $3)
                OR (end_date BETWEEN $2 AND $3)
                OR (start_date <= $2 AND end_date >= $3))
        `, [propertyId, startDate, endDate]
    );

    const bookings = result.rows;

    console.log(bookings);

    //TODO: update so dates are formatted nicely
    if (bookings.length > 0) {
      throw new BadRequestError(
        `Property is already booked from ${(bookings[0].startDate)} to ${(bookings[0].endDate)}. `
        + `Please select different dates to book.`);
    }
  }

  /** Create a booking (from data), update db, return new booking data.
   *
   * data should be { guestUsername, propertyId, startDate, endDate }
   *
   * Returns { id, guestUsername, propertyId, startDate, endDate }
   *
   * Throws BadRequestError if booking already in database.
   * */

  static async create({ guestUsername, propertyId, startDate, endDate }) {
    await this._validateBooking({ propertyId, startDate, endDate });

    const result = await db.query(`
              INSERT INTO bookings (guest_username,
                                    property_id,
                                    start_date,
                                    end_date)
              VALUES ($1, $2, $3, $4)
              RETURNING
                  id,
                  guest_username as "guestUsername",
                  property_id as "propertyId",
                  start_date as "startDate",
                  end_date as "endDate"`, [
      guestUsername,
      propertyId,
      startDate,
      endDate,
    ],
    );
    const booking = result.rows[0];

    return booking;
  }


}

module.exports = Booking;