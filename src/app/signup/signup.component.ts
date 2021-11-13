import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { patientsignup } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SIGNUPDETAIL = new FormGroup({});
  submitted = false;
  @Input() password = '';
  @Input() confirmedPassword = '';
  Gender = ['Male', 'Female'];
  constructor(public service: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm()
  }
  cancel() {
    this.router.navigate(['/login'])
  }
  onSubmit(SIGNUPDETAIL: FormGroup) {
    this.service.psignup = this.SIGNUPDETAIL.getRawValue()
    console.log(this.service.psignup);
    this.service.signup().subscribe(res=>{
      if(res =! 0){
        console.log('successfully registered')
      }
      else{
        console.log('we are sorry')
      }
    })
  }

  setValue() {
    this.SIGNUPDETAIL.setValue({
      name: '', age: '', gender: '', phoneNo: '',
      emailAddress: '', password: '', cpassword: '', address: ''
    });
  }
  resetForm() {
    this.SIGNUPDETAIL = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      phoneNo: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required, this.passwordsMatch(this.password, this.confirmedPassword).bind(this)]),
      address: new FormControl('', Validators.required),
    })

  }
  passwordsMatch(password: string, confirmedPassword: string) {
    return (control: FormControl): { [s: string]: boolean } => {
      console.log(password, confirmedPassword);
      if (password !== confirmedPassword) {
        return { 'passwordMismatch': true }
      } else {
        return null;
      }
    }
  }
  get f() {
    return this.SIGNUPDETAIL.controls;
  }
}
