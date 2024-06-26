import { randomUUID } from "crypto";
import { GraphQLError } from "graphql/error";


export const Mutation = {
  addCV: (parent: any, { addCVInput }: any, { db, pubSub }: any, infos: any) => {
    const { userId, skillIds, ...cvData } = addCVInput;
    const user = db.users.find((user: any) => user.id === parseInt(userId.toString()));
    if (!user) {
      throw new GraphQLError(`User with id ${userId} not found`);
    }

    const skillIdsAsNumbers = skillIds.map((id: any) => parseInt(id.toString()));
    const skills = db.skills.filter((skill: any) => skillIdsAsNumbers.includes(skill.id));
    if (skills.length !== skillIds.length) {
      throw new GraphQLError(`Invalid skill(s) provided: ${skillIds}`);
    }

    const newCV = { id: randomUUID(), user, skills, ...cvData };
    db.cvs.push(newCV);
    pubSub.publish("cvEvent", {
      type: "ADD",
      cv: newCV
    });
    return newCV;
  },

  updateCV: (parent: any, { updateCVInput }: any, { db, pubSub }: any, infos: any) => {
    const { id, userId, skillIds, ...cvData } = updateCVInput;
    const cv = db.cvs.find((cv: any) => cv.id === parseInt(id.toString()));
    if (!cv) {
      throw new GraphQLError(`CV with id ${id} not found`);
    }

    const user = db.users.find((user: any) => user.id === parseInt(userId.toString()));
    if (!user) {
      throw new GraphQLError(`User with id ${userId} not found`);
    }

    const skillIdsAsNumbers = skillIds.map((id: any) => parseInt(id.toString()));
    const skills = db.skills.filter((skill: any) => skillIdsAsNumbers.includes(skill.id));
    if (skills.length !== skillIds.length) {
      throw new GraphQLError(`Invalid skill(s) provided: ${skillIds}`);
    }

    cv.skills = skills;
    Object.assign(cv, cvData); // Update other fields
    pubSub.publish("cvEvent", {
      type: "UPDATE",
      cv: cv
    });
    return cv;
  },

  deleteCV: (parent: any, { id }: any, { db, pubSub }: any, infos: any) => {
    const cvIndex = db.cvs.findIndex((cv: any) => cv.id === parseInt(id.toString()));
    if (cvIndex === -1) {
      throw new GraphQLError(`CV with id ${id} not found`);
    }

    pubSub.publish("cvEvent", {
      type: "DELETE",
      cv: db.cvs[cvIndex]
    });
    return db.cvs.splice(cvIndex, 1)[0];
  }
};
