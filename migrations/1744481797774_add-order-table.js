/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("orders", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    content: {
      type: "text",
      notNull: true,
    },
    amount: {
      type: "real",
      notNull: true,
    },
    creation: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
      notNull: true,
    },
    table_number: {
      type: "integer",
      notNull: true,
    },
    productid: {
      type: "integer",
      references: "products(id)",
      onDelete: "CASCADE",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
