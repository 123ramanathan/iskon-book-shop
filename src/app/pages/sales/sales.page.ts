import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: false
})
export class SalesPage implements OnInit {

  constructor(public db: Db, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getDashboardDetails();
  }

  report_list = [
    {
      icon: "/assets/icon/today-sales.svg",
      value: "24",
      label: "Today's Sales"
    },
    {
      icon: "/assets/icon/revenue.svg",
      value: "₹12,450",
      label: "Revenue"
    },
    {
      icon: "/assets/icon/low-stock.svg",
      value: "3",
      label: "Low Stock Items"
    },
    {
      icon: "/assets/icon/week-sales.svg",
      value: "156",
      label: "This Week"
    }
  ]

  quick_actions = [
    {
      icon: '/assets/icon/stock-reconcilation.svg',
      label: 'Stock Reconciliation',
      route: '/stock-reconciliation'
    },
    {
      icon: '/assets/icon/stock-receipt.svg',
      label: 'Stock Receipt',
      route: '/stock-receipt'
    },
    {
      icon: '/assets/icon/close-shift.svg',
      label: 'Close Shift'
    }
  ]

  getDashboardDetails(){
    let data = {
      pos_id: "POS-00001"
    }
    this.db.sales_details(data).subscribe((res:any)=>{
      console.log(res, "sales details");
    });
  }

  openingPosEntry(){
    // let data = {
    //   user_id: 'umarbenz@gmail.com'
    // }
    // this.db.pos_opening_entry(data).subscribe((res:any)=>{
    //   console.log(res, "pos opening entry");
    //   this.router.navigateByUrl('/catalog');
    // });
    this.router.navigateByUrl('/catalog');
  }

}
