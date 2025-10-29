import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-close-shift',
  templateUrl: './close-shift.page.html',
  styleUrls: ['./close-shift.page.scss'],
  standalone: false
})
export class CloseShiftPage implements OnInit {

  constructor(public db: Db) { }

  ngOnInit() {
  }

  closeShift(){
    let data = {
      user_id: ""
    }
    this.db.pos_closing_entry(data).subscribe((res:any)=>{
      console.log(res, "close shift response");
    });
  }

}
