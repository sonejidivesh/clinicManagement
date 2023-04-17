import { MedicalTestPrescribed } from './MedicalTestPrescribed.model';
import{ Appointment } from './appointment.model';
import{MedicationPrescribed} from './medicationPrescribed.model';
import { VacinnationPrescribed } from './vacinationPrescribed.model';


export class Prescrition{
    id!: number;
  patientName!: string;
  doctorId!: number;
  appointmentId!: number;
  appointment?: Appointment;
  medicationPrescribedModels?: MedicationPrescribed[];
  medicationPrescribed?: MedicationPrescribed[];
  vacinationPrescribedModels?: VacinnationPrescribed[];
  vacinationPrescribeds?:VacinnationPrescribed[];
  medicalTestPrescribedModels?: MedicalTestPrescribed[];
  medicalTestPrescribeds?:MedicalTestPrescribed[];
  createdDate!: Date;
  isCreated?: boolean ;

}