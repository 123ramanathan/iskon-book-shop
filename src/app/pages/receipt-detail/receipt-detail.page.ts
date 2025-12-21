import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.page.html',
  styleUrls: ['./receipt-detail.page.scss'],
  standalone: false
})
export class ReceiptDetailPage implements OnInit {
  receipt_details: any = {};
  constructor(private route: ActivatedRoute, public db: Db) { }

  ngOnInit() {
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${month} ${year}`;
  }

  formatTime(timeString: string): string {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  ionViewWillEnter(){
    this.route.params.subscribe(res => {
      if(res && res['id']){
        console.log("Receipt ID: ", res['id']);
        this.get_confirmed_details(res['id']);
      }
    })
  }

  get_confirmed_details(detail: any){
    let data = {
      stock_entry_id: detail
    }
    this.db.get_confirmed_details(data).subscribe((res:any)=>{
      console.log(res, "get_confirmed_details")
      if(res && res.message && res.message.success){
        this.receipt_details = res.message.data
      }else{
        this.receipt_details = {}
      }
    })
  }

}
