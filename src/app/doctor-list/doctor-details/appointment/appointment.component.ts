import { Component , Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../../model/appointment.model';
import { IDoctor } from '../../../model/doctor.model';
import { DoctorService } from '../../doctor-list.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  appointment: Appointment = new Appointment();
  message: string= '';
  @Input() doctor: IDoctor = {} as IDoctor;

  constructor(private doctorservice:DoctorService) { }


  onSubmit(form:NgForm): void {

    this.appointment.doctorId = this.doctor.id;
    this.doctorservice.bookAppointment(this.appointment).subscribe((v)=>{
    alert(v.message)});
  }

 
}
