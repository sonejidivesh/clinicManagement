import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorButtonComponent } from './doctor-button.component';

describe('DoctorButtonComponent', () => {
  let component: DoctorButtonComponent;
  let fixture: ComponentFixture<DoctorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
