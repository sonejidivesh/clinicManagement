import { Component, Input , OnInit} from '@angular/core';
import { Appointment } from 'src/app/model/appointment.model';
import { MedicationPrescribed } from 'src/app/model/medicationPrescribed.model';
import { Medicine } from 'src/app/model/medicine.model';
import { Prescrition } from 'src/app/model/prescription.model';
import { FormGroup ,FormControl, FormArray} from '@angular/forms';
import { MedicineSerivice } from '../../medicine-List.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit {
@Input() appointment:Appointment = {} as Appointment;
prescription: Prescrition = {} as Prescrition;
medicationList: Medicine[] = [  ];
medicninelistForm =new FormArray([]);
form! : FormGroup;
Created: boolean = false;
submitText: string = 'Submit';


ngOnInit(): void {

  // this.medicationList=[{id:1,name:"Aspirin",price:9.99,quantity:100,available:true}]
  this.prescription.patientName =  this.appointment.patientName;
 
  this.initForm();

  
}

private initForm(){

  this.medicineService.getMedicineList().subscribe(data => {
    console.log(data);
    this.medicationList = data;
  });
  console.log(this.medicationList);
  let prescription:Prescrition;
   this.retriveData().subscribe(data =>{
      prescription = data;
      console.log(prescription);
      this.submitText = prescription.isCreated? "Submitted" : "Submit";
      this.Created = prescription.isCreated? true : false;
      if(prescription!= null){
        this.form = new FormGroup({
          'patientName': new FormControl({value:prescription.patientName, disabled: true}),
          'reason': new FormControl({value:this.appointment.appointmentReason, disabled: true}),
          'medicninelistForm': new FormArray([])
        });
        if(prescription.medicationPrescribed){

          console.log(prescription.medicationPrescribedModels);
          for(let medication of prescription.medicationPrescribed ){
            const control = new FormGroup({
              'medicationId': new FormControl({value:medication.medicationId, disabled: true}),
              'dosage': new FormControl({value:medication.dosage, disabled: true}),
              'frequency': new FormControl({value:medication.frequency, disabled: true}),
            });
            (this.form.get('medicninelistForm') as FormArray).push(control);
          }
        }
        

      }
   });

let medicineform =  new FormArray([]);
  this.form = new FormGroup({
    'patientName': new FormControl(this.appointment.patientName),
    'reason': new FormControl(this.appointment.appointmentReason),
    'medicninelistForm': medicineform
  });

}
constructor(private medicineService: MedicineSerivice ) { }



get controls() {
  return (this.form.get('medicninelistForm') as FormArray).controls;
}

retriveData():Observable<Prescrition>{
  return this.medicineService.getPrescription(this.appointment.id)
}


addMedicine(){
  const control = new FormGroup({
    'medicationId': new FormControl(),
    'dosage': new FormControl(),
    'frequency': new FormControl(),
  });
  (this.form.get('medicninelistForm') as FormArray).push(control);
}

onSubmit(){
  let currentDate =  new Date();
  const newPrescription =  new Prescrition();
  newPrescription.patientName = this.form.value['patientName'];
  newPrescription.appointmentId = this.appointment.id;
  newPrescription.doctorId = this.appointment.doctorId;
  newPrescription.createdDate = currentDate;
  newPrescription.medicationPrescribedModels = this.form.value['medicninelistForm'] as MedicationPrescribed[];

  this.medicineService.addPrescription(newPrescription).subscribe((v)=>{alert(v.message)});
}


  
}
