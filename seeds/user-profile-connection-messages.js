import usersData from "../seed-data/users.js";
import userProfilesData from "../seed-data/user_profiles.js";
import connectionRequestsData from "../seed-data/connection_requests.js";
import messagesData from "../seed-data/messages.js";

export async function seed(knex) {
  await knex("user").del();
  await knex("user_profile").del();
  await knex("connection_request").del();
  await knex("messages").del();
  await knex("user").insert(usersData);
  await knex("user_profile").insert(userProfilesData);
  await knex("connection_request").insert(connectionRequestsData);
  await knex("messages").insert(messagesData);
}
