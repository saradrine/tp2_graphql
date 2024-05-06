import { PrismaClient,CV } from '@prisma/client'
import { connect } from 'http2';
const prisma = new PrismaClient()
async function main(){
    // Données fictives pour les utilisateurs
    await prisma.cV.deleteMany();
    await prisma.user.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.user.createMany({
        data: [
            { id: 1, name: 'Sara Drine', email: 'sara@gmail.com', role: "USER"/*Role.USER*/ },
            { id: 2, name: 'Rim Jbeli', email: 'rim@gmail.com', role: "ADMIN"/*Role.ADMIN*/ },
            { id: 3, name: 'Ines Samet', email: 'ines@gmail.com', role: "USER"/*Role.USER*/ },
            { id: 4, name: 'Aziz Ben Ghorbel', email: 'aziz@gmail.com', role: "USER"/*Role.USER*/ },
        ]
    });

    // Données fictives pour les compétences
    await prisma.skill.createMany({
        data: [
            { id: 1, designation: 'JavaScript' },
            { id: 2, designation: 'Python' },
            { id: 3, designation: 'React' },
            { id: 4, designation: 'Machine Learning' },
            { id: 5, designation: 'NestJs' },
            { id: 6, designation: 'Angular' },
            { id: 7, designation: 'Vue' },
            { id: 8, designation: 'Django' },
            { id: 9, designation: 'Flask' },
            { id: 10, designation: 'NodeJs' },
            { id: 11, designation: 'Express' },
            { id: 12, designation: 'Java' },
            { id: 13, designation: 'Spring' },
            { id: 14, designation: 'C#' },
            { id: 15, designation: 'ASP.NET' },
            { id: 16, designation: 'PHP' },
            { id: 17, designation: 'Laravel' },
            { id: 18, designation: 'Symfony' },
        ]
    });

    // Données fictives pour les CVs
    const skillIdsByCV = [
        [4, 1, 1],
        [1, 3, 5, 7, 9],
        [2,4,6],
        [7,9,11],
        [8,10,12],
    ];

    await prisma.cV.createMany({
        data: [
            { name: 'CV Sara', age: 21, job: 'Software Engineer', userId: 1 },
            { name: 'CV Sara2', age: 22, job: 'Software Engineer', userId: 1 },
            { name: 'CV Rim', age: 21, job: 'Data Scientist', userId: 2 },
            { name: 'CV Ines', age: 21, job: 'Baker', userId: 3 },
            { name: 'CV Aziz', age: 22, job: 'Architect', userId: 4 },
        ],
    });
    const createdCVs: CV[] =await prisma.cV.findMany();
    const associations = [];
    for (let i = 0; i < createdCVs.length; i++) {
        const cv = createdCVs[i];
        const skillsForCV = skillIdsByCV[i];
        const connectOperations = skillsForCV.map((skillId) => ({
        id: skillId,
        }));

        await prisma.cV.update({
        where: { id: cv.id },
        data: {
            skills: {
            connect: connectOperations,
            },
        },
        });
    }
}
main()