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
  error_message: any;

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
    this.db.login(data).subscribe( async (res: any) => {
      // console.log('Login response', res);
      if(res && res.status == 'Success' && res.message){
        this.error_message = "";
        this.submitted = false;
        let token = `token ${res.message.api_key}:${res.message.api_secret}`;
        localStorage['token'] = token;
        localStorage['username'] = res.message.username;
        localStorage['pos_profile'] = res.message.pos_profile;
        this.openingPosEntry();
        // await this.loginForm.reset();
        // this.router.navigateByUrl('/tabs/sales');
        // this.db.presentToast('Login Successful', 'success');
      }else{
        this.error_message = res.message.message;
      }
    })
  }

  openingPosEntry(){
    let data = {
      user: localStorage['username']
    }
    this.db.pos_opening_entry(data).subscribe((res:any)=>{
      if(res && res.message && res.status == "Success"){
        // console.log(res, "pos opening entry");
        // this.router.navigateByUrl('/catalog');
        this.loginForm.reset();
        this.router.navigateByUrl('/tabs/sales');
        this.db.presentToast('Login Successful', 'success');
      }else{
        this.db.presentToast(res.message.message, 'error');
      }
    });
  }

}
