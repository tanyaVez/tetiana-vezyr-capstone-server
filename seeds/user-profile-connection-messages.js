import usersData from "../seed-data/users.js";
import userProfilesData from "../seed-data/user_profiles.js";
import connectionsData from "../seed-data/connections.js";
import messagesData from "../seed-data/messages.js";
import skillsData from "../seed-data/skills.js";

export async function seed(knex) {
  await knex("user").del();
  await knex("user_profile").del();
  await knex("connections").del();
  await knex("messages").del();
  await knex("skills").del();
  await knex("user_skills").del();

  await knex("user").insert(usersData);
  await knex("user_profile").insert(userProfilesData);
  await knex("connections").insert(connectionsData);
  await knex("messages").insert(messagesData);

  await knex('skills').insert(skillsData);

  const skills = await knex('skills').select('id');
  const validSkillsIds = new Set(skills.map(skill => skill.id));

  const userProfiles = await knex('user_profile').select('id');

  const userSkills = userProfiles.map((userProfile) => {
    const randomSkills = Array.from(validSkillsIds)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return randomSkills.map(skillId => ({
      user_profile_id: userProfile.id,
      skill_id: skillId
    }));
  }).flat();

  if (userSkills.length > 0) {
    await knex('user_skills').insert(userSkills);
  }
}
