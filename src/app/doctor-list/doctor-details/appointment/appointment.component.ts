import { Component , Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../../model/appointment.model';
import { IDoctor } from '../../../model/doctor.model';
import { DoctorService } from '../../doctor-list.service';


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


  onSubmit(): void {

    this.appointment.doctorId = this.doctor.id;
    console.log(this.appointment);
    this.doctorservice.bookAppointment(this.appointment).subscribe(res => {
    //  this.message= res.message;
    },
    error => {
      this.message= error.message;
    });

  }

 
}
