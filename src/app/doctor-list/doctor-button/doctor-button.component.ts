import { Component,Input, Output, EventEmitter , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctor } from 'src/app/model/doctor.model';


@Component({
  selector: 'app-doctor-button',
  templateUrl: './doctor-button.component.html',
  styleUrls: ['./doctor-button.component.css']
})
export class DoctorButtonComponent implements OnInit {
@Input() doctorDetails: IDoctor = {} as IDoctor;

constructor(private router:Router,private route:ActivatedRoute) { }

ngOnInit(): void {

  // console.log(this.doctorDetails);
}

onBtnClick(doctorInfo:IDoctor){
 this.router.navigate([doctorInfo.id
  ],{relativeTo:this.route});

  };



}


