import{ Appointment } from './appointment.model';
import{MedicationPrescribed} from './medicationPrescribed.model';


export class Prescrition{
    id!: number;
  patientName!: string;
  doctorId!: number;
  appointmentId!: number;
  appointment?: Appointment;
  medicationPrescribedModels?: MedicationPrescribed[];
  medicationPrescribed?: MedicationPrescribed[];
  createdDate!: Date;
  isCreated?: boolean ;

}