/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("user_profile", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .unique();
    table
      .enu("role", ["mentor", "mentee", "admin"])
      .notNullable()
      .defaultTo("mentee");
    table.string("name").notNullable();
    table.text("bio").nullable();
    table.string("location").nullable();
    table.string("profile_picture_url").nullable();
    table
      .enu("mode", ["in-person", "online", "both"])
      .notNullable()
      .defaultTo("both");
    table.text("experience").nullable();
    table.text("goals").nullable();
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
export function down(knex) {
  return knex.schema.dropTableIfExists("user_profile");
}
