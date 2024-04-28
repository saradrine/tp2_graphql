import { User, CV, Skill, Role } from "./models";


// Données fictives pour les utilisateurs
const users: User[] = [
    { id: 1, name: 'Sara Drine', email: 'sara@gmail.com', role: Role.USER },
    { id: 2, name: 'Rim Jbeli', email: 'rim@gmail.com', role: Role.ADMIN },
    { id: 3, name: 'Ines Samet', email: 'ines@gmail.com', role: Role.USER },
    { id: 4, name: 'Aziz Ben Ghorbel', email: 'aziz@gmail.com', role: Role.USER },
    { id: 5, name: 'Mohamed Zouaghi', email: 'mohamed@gmail.com', role: Role.USER },
];

// Données fictives pour les compétences
const skills: Skill[] = [
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
];


// Données fictives pour les CVs imbriquées
// const cvs: CV[] = [
//     { id: 1, name: 'CV Sara', age: 21, job: 'Software Engineer', user: users[0], skills: [skills[0], skills[2], skills[4]] },
//     { id: 5, name: 'CV Sara2', age: 22, job: 'Software Engineer', user: users[0], skills: [skills[0], skills[2], skills[4], skills[6], skills[8]] },
//     { id: 2, name: 'CV Rim', age: 21, job: 'Data Scientist', user: users[1], skills: [skills[1], skills[3], skills[5]] },
//     { id: 3, name: 'CV Ines', age: 21, job: 'Baker', user: users[2], skills: [skills[6], skills[8], skills[10]] },
//     { id: 4, name: 'CV Aziz', age: 22, job: 'Architect', user: users[3], skills: [skills[7], skills[9], skills[11]] },
//     { id: 6, name: 'CV Zouaghi', age: 23, job: 'Engineer', user: users[4], skills: [skills[7], skills[9], skills[11], skills[13], skills[15]] },
// ];


// Données fictives pour les CVs non imbriquées
const cvs: CV[] = [
    { id: 1, name: 'CV Sara', age: 21, job: 'Software Engineer', user: users[0], skills: [skills[0], skills[2], skills[4]] },
    { id: 5, name: 'CV Sara2', age: 22, job: 'Software Engineer', user: users[0], skills: [skills[0], skills[2], skills[4], skills[6], skills[8]] },
    { id: 2, name: 'CV Rim', age: 21, job: 'Data Scientist', user: users[1], skills: [skills[1], skills[3], skills[5]] },
    { id: 3, name: 'CV Ines', age: 21, job: 'Baker', user: users[2], skills: [skills[6], skills[8], skills[10]] },
    { id: 4, name: 'CV Aziz', age: 22, job: 'Architect', user: users[3], skills: [skills[7], skills[9], skills[11]] },
    { id: 6, name: 'CV Zouaghi', age: 23, job: 'Engineer', user: users[4], skills: [skills[7], skills[9], skills[11], skills[13], skills[15]] },
];


export const db = {
    users,
    skills,
    cvs,
};
