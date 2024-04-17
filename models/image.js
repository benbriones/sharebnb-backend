"use strict";

const db = require("../db");


/** related functions for images */

class Image {
  /** Create an image (from data), update db, return new image data.
    *
    * data should be { key, caption, propertyId }
    *
    * Returns { key, caption, propertyId }
    *
    * Throws BadRequestError if image already in database.
    * */

  static async create({ key, caption, propertyId }) {

    const duplicateCheck = await db.query(`
      SELECT key
      FROM images
      WHERE key = $1`, [key]);

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate image: ${key}`);
    }

    const result = await db.query(`
    INSERT INTO images (key, caption, property_id)
      VALUES ($1, $2, $3)
      RETURNING key, caption, property_id AS propertyId`,
      [key, caption, propertyId]);

    const image = result.rows[0];
    return image;
  }
}

module.exports = Image;