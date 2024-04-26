import { GraphQLError } from 'graphql/error';
import { db } from '../database';
import { CV } from '../models';


export const Query = {
    getAllCVs: (): any => db.cvs,
    // getCVById: (_: any, { id }: { id: number }): CV | undefined => db.cvs.find(cv => cv.id === id),
    getCVById: (_: any, { id }: { id: number }, { db }: { db: any }): CV => {
        const findCV = db.cvs.find((cv: any) => cv.id === parseInt(id.toString()));
        if (!findCV) {
            throw new GraphQLError("CV not found");
        }
        return findCV;
    },
};



