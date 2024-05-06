import {GraphQLError} from "graphql/error";
import { PrismaClient,CV } from '@prisma/client'
import { connect } from "http2";
const prisma = new PrismaClient()
export const Mutation = {
  addCV: (parent: any, { addCVInput }: any, {pubSub }: any, infos: any) => {
    const { userId, skillIds, ...cvData } = addCVInput;
    addCVInput.userId = +addCVInput.userId;
    addCVInput.skillIds = undefined;
    return prisma.cV.create({
      data: {
        ...addCVInput,
        skills: {
          connect: skillIds.map((skillIds: any) => ({ id : +skillIds }))
        },
      },
      include:{
        skills:true,
      }
    });
  },

  updateCV: async (parent: any, { updateCVInput }: any, { pubSub }: any, infos: any) => {
    const { id, userId, skillIds, ...cvData } = updateCVInput;
    updateCVInput.userId = +updateCVInput.userId;
    updateCVInput.skillIds = undefined;
    updateCVInput.id = undefined;
    if (isNaN(updateCVInput.userId)) { updateCVInput.userId = (await ( prisma.cV.findFirst({where :{id : +id}})))?.userId; }
    if(isNaN(updateCVInput.userId)){throw new GraphQLError("Record not valid");}
    if (skillIds === undefined) {
      return prisma.cV.update({
        where: { id: +id },
        data: {
          ...updateCVInput
        },
        include:{
          skills:true,
        }
      });
    }
    return prisma.cV.update({
      where: { id: +id },
      data: {
        ...updateCVInput,
        skills: {
          connect: skillIds.map((skillId: any) => ({ id: +skillId }))
        },
        include:{
          skills:true,
        }
      },
    });
  },

  deleteCV: async (parent: any, { id }: any, {pubSub }: any, infos: any) => {
    return await prisma.cV.delete({where : {id : +id},
      include:{
        skills:true,
      }});;
  }
};
