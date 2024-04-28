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
    userId: number; // Référence à l'utilisateur
}

export interface CV_Skill{
    cvId: number;
    skillId: number;

}

export interface Skill {
    id: number;
    designation: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}