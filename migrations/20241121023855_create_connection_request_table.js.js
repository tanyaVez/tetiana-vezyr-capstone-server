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
    table;
    table
      .integer("receiver_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.enu("status", ["accepted", "pending", "declined"]).notNullable();

    table
      .string("sorted_sender_receiver")
      .stored()
      .as(
        knex.raw(
          'CONCAT(LEAST(sender_id, receiver_id), "_", GREATEST(sender_id, receiver_id))'
        )
      );
    table.unique("sorted_sender_receiver");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.dropTableIfExists("connection_request");
};
