import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-close-shift',
  templateUrl: './close-shift.page.html',
  styleUrls: ['./close-shift.page.scss'],
  standalone: false
})
export class CloseShiftPage implements OnInit {
  report_details: any = {};
  constructor(public db: Db) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getDashboardDetails();
  }

  closeShift(){
    let data = {
      user: "umarbenz@gmail.com"
    }
    this.db.pos_closing_entry(data).subscribe((res:any)=>{
      console.log(res, "close shift response");
    });
  }

  getDashboardDetails(){
    let data = {
      pos_profile: localStorage['store_name']
    }
    this.db.sales_details(data).subscribe((res:any)=>{
      console.log(res, "sales details");
      if(res && res.status == "Success" && res.message){
        this.report_details = res.message;
      }else{
        this.report_details = {};
      }
    });
  }

}
