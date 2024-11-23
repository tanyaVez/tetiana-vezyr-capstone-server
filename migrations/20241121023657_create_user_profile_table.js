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
      .onDelete("CASCADE");
    table.enu("role", ["mentor", "mentee", "admin"]).notNullable().defaultTo('mentee');
    table.string("name").notNullable();
    table.text("bio").nullable();
    table.json("skills").nullable();
    table.json("availability").nullable();
    table.json("areas_of_interest").nullable();
    table.string("location").nullable();
    table.string("profile_picture_url").nullable();
    table.string('mentoring_style').nullable();
    table.text('previous_experience').nullable();
    table.text('goals').nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("user_profile");
}
