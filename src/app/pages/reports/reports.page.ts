import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false
})
export class ReportsPage implements OnInit {
  report_details:any;
  constructor(public db:Db) { }

  ngOnInit() {
    this.get_reports()
  }

  get_reports(){
    const params = {
      pos_profile: localStorage['store_name']
    }
    this.db.get_reports(params).subscribe((res:any)=>{
      if(res.message){
        this.report_details = res.message;
      }
    })
  }

}
