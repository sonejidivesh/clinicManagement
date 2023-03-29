import { Component, Input , OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDoctor } from 'src/app/model/doctor.model';
import { DoctorService } from '../doctor-list.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentComponent } from 'src/app/doctor-list/doctor-details/appointment/appointment.component';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
  providers:[DoctorService]
})
export class DoctorDetailsComponent implements OnInit {
  modalRef!: BsModalRef;
  @Input() doctor: IDoctor = {} as IDoctor;
  @ViewChild('appointmentModal') appointmentModal!: TemplateRef<AppointmentComponent>;
  constructor(private doctorService: DoctorService, private route:ActivatedRoute , private modalService: BsModalService) { 
  }

ngOnInit(): void {
      this.getDetails(this.route.snapshot.params['id']);
  }


  getDetails(id:number){

    this.doctorService.getDoctorDetails(id).subscribe(data => this.doctor = data);

  }

  openAppointmentModal() {
    this.modalRef = this.modalService.show(this.appointmentModal);
  }

}
