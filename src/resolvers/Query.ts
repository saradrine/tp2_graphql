import { GraphQLError } from 'graphql/error';
import { db } from '../database';

export const CV = {
    id: ({ id }: any) => id || 0,
    name: ({ name }: any) => name || "",
    age: ({ age }: any) => age || "",
    job: ({ job }: any) => job || "",


    user: ({ user }: any, _: any, { db }: any) => {
        return { id: user.id, name: user.name, email: user.email, role: user.role };
    },
    skills: ({ skills }: { skills: any }, __: any, { db }: any) => {
        return skills;
    },
}

export const Query = {
    getAllCVs: (): any => db.cvs,
    // getCVById: (_: any, { id }: { id: number }): CV | undefined => db.cvs.find(cv => cv.id === id),
    getCVById: (_: any, { id }: { id: number }, { db }: { db: any }): any => {
        const findCV = db.cvs.find((cv: any) => cv.id === id);
        if (!findCV) {
            throw new GraphQLError("CV not found");
        }
        return findCV;
    },
    getSkills: (_: any, __: any, { db }: any) => {
        return db.skills;
    },
};

export const Skill = {

    cvs: ({ id }: { id: number }, _: any, { db }: any) => {

        const cvfound = db.cvs.filter((cv: any) => {
            return include(cv.skills, "id", id);
        })
        return cvfound;
    },
}

export function include(array: any, attribut = "", value: any) {
    return array.some((element: any) => element[attribut] == value);
}