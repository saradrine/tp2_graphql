export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface CV {
    id: number;
    name: string;
    age: number;
    job: string;
    user: User; // Référence à l'utilisateur
    skills: Skill[]; // Référence aux compétences
}

export interface Skill {
    id: number;
    designation: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}