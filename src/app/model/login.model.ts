import { IDoctor } from "./doctor.model";

export class Login{
    id!:number;
    doctorName!: string;
    password!: string;
    doctorDetails!:IDoctor;
}