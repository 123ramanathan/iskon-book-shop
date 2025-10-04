import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage implements OnInit {
  discount:any;
  subtotal:any
  constructor(public db:Db) { }

  ngOnInit() {
    this.db.get_cart_items();
  }


  remove_item(item:any){

  }



  onSelect(value: string) {
    console.log('Selected:', value);
  }
  

}
