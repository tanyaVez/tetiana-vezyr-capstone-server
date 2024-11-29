import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getAllSkills = async (req, res) => {
  try {
    const skills = await knex("skills").select("name");
    const skillNames = skills.map(skill => skill.name);
    res.json(skillNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching skills" });
  }
};

export { getAllSkills };
