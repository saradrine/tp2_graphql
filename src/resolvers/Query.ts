import { GraphQLError } from 'graphql/error';
import { db } from '../database';
import { CV } from '../models';
import { Subscription } from './Subscription';


export const Query = {
    getAllCVs: (): any => db.cvs,
    // getCVById: (_: any, { id }: { id: number }): CV | undefined => db.cvs.find(cv => cv.id === id),
    getCVById: (_: any, { id }: { id: number }, { db, pubSub }: any): CV => {
        const findCV = db.cvs.find((cv: any) => cv.id === parseInt(id.toString()));
        if (!findCV) {
            throw new GraphQLError("CV not found");
        }
        // pubSub.publish("cvEvent",  "A new CV has been added!" );
        return findCV;
    },
};



