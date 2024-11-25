/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("skills", (table) => {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
    })
    .createTable("user_skills", (table) => {
      table
        .integer("user_profile_id")
        .unsigned()
        .references("id")
        .inTable("user_profile")
        .onDelete("CASCADE");
      table
        .integer("skill_id")
        .unsigned()
        .references("id")
        .inTable("skills")
        .onDelete("CASCADE");
      table.primary(["user_profile_id", "skill_id"]);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTableIfExists("user_skills")
    .dropTableIfExists("skills");
}
