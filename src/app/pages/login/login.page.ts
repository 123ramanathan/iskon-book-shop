import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  loginForm: FormGroup | any;
  showPassword = false;
  submitted = false;

  constructor(private fb: FormBuilder, private navCtrl: NavController, private router: Router, public db: Db) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access in template
  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = this.loginForm.value;
    console.log('Login payload', payload);
    // this.router.navigateByUrl('/tabs/sales');
    this.login();
  }

  login(){
    let data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    this.db.login(data).subscribe(res => {
      // console.log('Login response', res);
      this.loginForm.reset();
      this.router.navigateByUrl('/tabs/sales');
    })
  }

}
