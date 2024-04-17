"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for properties */


/** Methods:
 *
 * Create
 * FindAll
 * Get (by specific ID)
 * Update
 * Delete
 */
class Property {
  /** Create a property (from data), update db, return new property data.
     *
     * data should be { title, address, description, price, owner }
     *
     * Returns { title, address, description, price, owner }
     *
     * Throws BadRequestError if property already in database.
     * */

  static async create({ title, address, description, price, owner }) {
    const duplicateCheck = await db.query(`
      SELECT address
      FROM properties
      WHERE address = $1`, [address]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate property: ${address}`);

    const result = await db.query(`
              INSERT INTO properties (title,
                                     address,
                                     description,
                                     price,
                                     owner)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING
                  title,
                  address,
                  description,
                  price,
                  owner`, [
      title,
      address,
      description,
      price,
      owner,
    ],
    );
    const property = result.rows[0];

    return property;
  }

  /** Create WHERE clause for filters, to be used by functions that query
   * with filters.
   *
   * searchFilters (all optional):
   * - minPrice
   * - maxPrice
   * - titleLike (will find case-insensitive, partial matches)
   *
   * Returns {
   *  where: "WHERE num_employees >= $1 AND name ILIKE $2",
   *  vals: [100, '%Apple%']
   * }
   */

  static _filterWhereBuilder({ minPrice, maxPrice, titleLike }) {
    let whereParts = [];
    let vals = [];

    if (minPrice !== undefined) {
      vals.push(minPrice);
      whereParts.push(`price >= $${vals.length}`);
    }

    if (maxPrice !== undefined) {
      vals.push(maxPrice);
      whereParts.push(`price <= $${vals.length}`);
    }

    if (titleLike) {
      vals.push(`%${titleLike}%`);
      whereParts.push(`title ILIKE $${vals.length}`);
    }

    const where = (whereParts.length > 0) ?
      "WHERE " + whereParts.join(" AND ")
      : "";

    return { where, vals };
  }

  /** Find all properties (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minPrice
   * - maxPrice
   * - titleLike (will find case-insensitive, partial matches)
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll(searchFilters = {}) {
    const { minPrice, maxPrice, titleLike } = searchFilters;

    if (minPrice > maxPrice) {
      throw new BadRequestError("Min price cannot be greater than max");
    }

    const { where, vals } = this._filterWhereBuilder({
      minPrice, maxPrice, titleLike,
    });

    const propertiesRes = await db.query(`
          SELECT title,
                 address,
                 description,
                 price,
                 owner
          FROM properties ${where}
          ORDER BY title`, vals);
    return propertiesRes.rows;
  }
}