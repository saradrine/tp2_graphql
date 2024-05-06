import { GraphQLError } from 'graphql/error';
import { PrismaClient,CV,Skill } from '@prisma/client'
import { connect } from 'http2';
const prisma = new PrismaClient()
import { Subscription } from './Subscription';


export const Query = {
    getAllCVs:  (): any => prisma.cV.findMany({include:{
        skills:true,
    }}),
    // getCVById: (_: any, { id }: { id: number }): CV | undefined => db.cvs.find(cv => cv.id === id),
    getCVById: async (_: any, { id }: { id: number }, {  pubSub }: any): Promise<CV> => {
        const findCV =  await prisma.cV.findFirst({ where: { id: +id },include:{skills:true,}});
        if (!findCV) { 
            throw new GraphQLError("CV not found");
        }
        pubSub.publish("cvEvent",  "A new CV has been added!" );
        return findCV;
    },
};



