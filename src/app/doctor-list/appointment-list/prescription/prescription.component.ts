import { Component, Input , OnInit} from '@angular/core';
import { Appointment } from 'src/app/model/appointment.model';
import { MedicationPrescribed } from 'src/app/model/medicationPrescribed.model';
import { Medicine } from 'src/app/model/medicine.model';
import { Prescrition } from 'src/app/model/prescription.model';
import { FormGroup ,FormControl, FormArray} from '@angular/forms';
import { MedicineSerivice } from '../../medicine-List.service';
import { Observable } from 'rxjs';
import { Vacinnation } from 'src/app/model/vacinnation.model';
import { VacinationService } from '../../vacination.service';
import { RadiologyService } from '../../radiology.service';
import { Radiology } from 'src/app/model/radiology.model';
import { VacinnationPrescribed } from 'src/app/model/vacinationPrescribed.model';
import { MedicalTestPrescribed } from 'src/app/model/MedicalTestPrescribed.model';
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit {
@Input() appointment:Appointment = {} as Appointment;
prescription: Prescrition = {} as Prescrition;
medicationList: Medicine[] = [  ];
vaccineList: Vacinnation[] = [  ];
radiologyList: Radiology[] = [  ];
medicninelistForm =new FormArray([]);
vaccineListForm = new FormArray([]);
radiologyListForm = new FormArray([]);

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

  this.vaccineService.getVacinationList().subscribe(data => {
    this.vaccineList = data;
  });


  this.radiologyService.getRadiologList().subscribe(data => {

    this.radiologyList = data;
  });
 
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
          'medicninelistForm': new FormArray([]),
          'vaccineListForm': new FormArray([]),
          'radiologyListForm': new FormArray([]),
        });
        if(prescription.medicationPrescribed){
          for(let medication of prescription.medicationPrescribed ){
            const control = new FormGroup({
              'medicationId': new FormControl({value:medication.medicationId, disabled: true}),
              'dosage': new FormControl({value:medication.dosage, disabled: true}),
              'frequency': new FormControl({value:medication.frequency, disabled: true}),
            });
            (this.form.get('medicninelistForm') as FormArray).push(control);
          }
        }

        if(prescription.vacinationPrescribeds){
          for(let vaccine of prescription.vacinationPrescribeds ){
            const control = new FormGroup({
              'VacinationId': new FormControl({value:vaccine.VacinationId, disabled: true}),
              'Dose': new FormControl({value:vaccine.Dose, disabled: true}),
            });
            (this.form.get('vaccineListForm') as FormArray).push(control);
          }
        }

        if(prescription.medicalTestPrescribeds){
          for(let mediTest of prescription.medicalTestPrescribeds ){
            console.log(mediTest)
            const control = new FormGroup({
              'TestId': new FormControl({value:mediTest.testId, disabled: true}),
              
            });
            (this.form.get('radiologyListForm') as FormArray).push(control);
          }
        }
        

      }
   });

let medicineform =  new FormArray([]);
let vaccineform =  new FormArray([]);
let radiologyform = new FormArray([]);
  this.form = new FormGroup({
    'patientName': new FormControl(this.appointment.patientName),
    'reason': new FormControl(this.appointment.appointmentReason),
    'medicninelistForm': medicineform,
    'vaccineListForm': vaccineform,
    'radiologyListForm': radiologyform,

  });

  

}
constructor(private medicineService: MedicineSerivice , private vaccineService:VacinationService, private radiologyService:RadiologyService) { }



get controls() {
  return (this.form.get('medicninelistForm') as FormArray).controls;
}



get vaccontrols() {

  return (this.form.get('vaccineListForm') as FormArray).controls;
}


get radiocontrols() {

  return (this.form.get('radiologyListForm') as FormArray).controls;
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


addVaccination(){
  const vacineControl = new FormGroup({
    'VacinationId': new FormControl(),
    'Dose': new FormControl(),
  });
  (this.form.get('vaccineListForm') as FormArray).push(vacineControl);
}

addRadiology(){
  const radioControl = new FormGroup({
    'TestId': new FormControl(),
  });

  (this.form.get('radiologyListForm') as FormArray).push(radioControl);
}



onSubmit(){
  let currentDate =  new Date();
  const newPrescription =  new Prescrition();
  newPrescription.patientName = this.form.value['patientName'];
  newPrescription.appointmentId = this.appointment.id;
  newPrescription.doctorId = this.appointment.doctorId;
  newPrescription.createdDate = currentDate;
  newPrescription.medicationPrescribedModels = this.form.value['medicninelistForm'] as MedicationPrescribed[];
  newPrescription.vacinationPrescribedModels = this.form.value['vaccineListForm'] as VacinnationPrescribed[];
  newPrescription.medicalTestPrescribedModels = this.form.value['radiologyListForm'] as MedicalTestPrescribed[];

  this.medicineService.addPrescription(newPrescription).subscribe((v)=>{alert(v.message)});
}


  
}
