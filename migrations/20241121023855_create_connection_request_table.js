/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("connection_request", (table) => {
    table.increments("id").primary();
    table
    .integer("sender_id")
    .unsigned()
    .references("id")
    .inTable("user")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    table
    .integer("receiver_id")
    .unsigned()
    .references("id")
    .inTable("user")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    table.enu("status", ["accepted", "pending", "declined"]).notNullable();
    table.string("sorted_sender_receiver").notNullable().unique();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("connection_request");
}
