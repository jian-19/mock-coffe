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
    category_id: {
      type: "integer",
      references: "categories(id)",
      onDelete: "CASCADE",
      notNull: true,
    },
  });

  pgm.sql(`
    INSERT INTO 
      categories (name) 
    VALUES
      ('Bebidas Quentes'),
      ('Bebidas Frias'),
      ('Lanches')
  ;`)

  pgm.sql(`
    INSERT INTO 
      products (title, content, amount, image, category_id)
    VALUES 
      ('Café Expresso', 'Café curto, forte e aromático.', 5.00, 'public\hot_coffees\cafe expresso.png', 1),
      ('Cappuccino', 'Café com leite vaporizado e espuma.', 8.50, 'public\hot_coffees\cafe cappuccino.png', 1),
      ('Mocha', 'Café, chocolate e leite vaporizado.', 9.00, 'public\hot_coffees\cafe mocha.png', 1),
      ('Chá de Camomila', 'Chá relaxante feito com camomila.', 6.00, 'public\hot_coffees\cha de camomila.png', 1),
      ('Latte', 'Café expresso com bastante leite vaporizado.', 7.50, 'public\hot_coffees\cafe latte.png', 1)
  ;`)

  pgm.sql(`
    INSERT INTO 
      products (title, content, amount, image, category_id)
    VALUES 
      ('Suco de Laranja', 'Suco natural de laranja.', 7.00, 'public\cold_coffees\suco de laranja.png', 2),
      ('Refrigerante', 'Lata de refrigerante tradicional.', 6.00, 'public\cold_coffees\refrigerante.png', 2),
      ('Água com Gás', 'Garrafa de água gaseificada.', 4.00, 'public\cold_coffees\agua com gas.png', 2),
      ('Chá Gelado', 'Chá preto gelado com limão.', 6.50, 'public\cold_coffees\cha gelado.png', 2),
      ('Milkshake de Chocolate', 'Milkshake feito com sorvete e chocolate.', 10.00, 'public\cold_coffees\milkshake.png', 2)
  ;`)

  pgm.sql(`
    INSERT INTO 
      products (title, content, amount, image, category_id)
    VALUES 
      ('Pão de Queijo', 'Porção com 5 unidades de pão de queijo.', 7.00, 'public\snacks\pao de queijo.png', 3),
      ('Sanduíche Natural', 'Sanduíche de frango, alface e tomate.', 9.50, 'public\snacks\sanduiche natural.png', 3),
      ('Croissant de Presunto e Queijo', 'Croissant recheado com presunto e queijo.', 8.50, 'public\snacks\croissant.png', 3),
      ('Bolo de Chocolate', 'Fatia de bolo de chocolate caseiro.', 6.50, 'public\snacks\bolo de chocolate.png', 3),
      ('Torrada com Manteiga', 'Porção de torradas com manteiga.', 5.00, 'public\snacks\torrada.png', 3)
  ;`)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
