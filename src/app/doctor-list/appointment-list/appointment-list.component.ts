import { Component , OnDestroy, OnInit, Input} from '@angular/core';
import { DoctorService } from '../doctor-list.service';
import { Appointment } from '../../model/appointment.model';
import { DatePipe } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ViewChild, TemplateRef } from '@angular/core';
import{MedicineSerivice} from '../medicine-List.service';
import { IDoctor } from 'src/app/model/doctor.model';
import{ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})


export class AppointmentListComponent implements OnInit, OnDestroy {
  @Input() doctor: IDoctor = {} as IDoctor;
  modalRef!: BsModalRef;
  @ViewChild('prescriptionModal') appointmentModal!: TemplateRef<AppointmentListComponent>;
  page: number = 1;
  appointment!: Appointment;
  appointmentList: Appointment[] = [];
  appointmentListSubscription : Subscription | undefined;
  medicinSUb:Subscription | undefined; 
  
  pipe = new DatePipe('en-US');
  constructor(private doctorService:DoctorService ,  private modalService: BsModalService , private medicalService:MedicineSerivice , private route:ActivatedRoute){}

ngOnInit(): void {
  
  this.doctorService.appointmentSub.subscribe(() => {
    this.getAppointmentList();
    });

  this.getAppointmentList();

  this.medicalService.medicineSub.subscribe(()=>{

    this.closeModal();

  });
  }


getAppointmentList(){
  this.appointmentListSubscription = this.doctorService.getAllAppoiintments(this.route.snapshot.params['id']).subscribe( data=> {
    this.appointmentList = data
  });;
}

 
openAppointmentModal(appointmentDetails: Appointment) {
  this.appointment = appointmentDetails;
  this.modalRef = this.modalService.show(this.appointmentModal);
}




  ngOnDestroy(){
    this.appointmentListSubscription?.unsubscribe();
    this.medicinSUb?.unsubscribe();
  }

  closeModal() {
    this.modalService.hide();
  }

}

