import { IDoctor } from "./doctor.model";

export class Appointment {
    id!: number;
    patientName!: string;
    appointmentDateTime!: Date;
    doctorId!: number;
    doctor!:IDoctor;
    appointmentReason!: string;
    appointmentNotes!: string;
    completed!: boolean;
  }