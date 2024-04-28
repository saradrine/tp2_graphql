// @ts-nocheck
// for types unchecking

export const CV = {
    skills: (cv, args, { db }) => {
      return db.cvSkills
        .filter((cvSkill) => cvSkill.cvId === cv.id)
        .map((cvSkill) => db.skills.find((skill) => skill.id === cvSkill.skillId));
    },
    user: (cv, args, { db }) => {
      return db.users.find((user) => user.id === cv.userId);
    },
  };