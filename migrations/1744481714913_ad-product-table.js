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
  pgm.createTable("categories", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "text",
      notNull: true,
    },
  });

  pgm.createTable("products", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    title: {
      type: "text",
      notNull: true,
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
    image: {
      type: "text",
    },
    categoryid: {
      type: "integer",
      references: "categories(id)",
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
