import { Component, Input, OnInit } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-catalog-cards',
  templateUrl: './catalog-cards.component.html',
  styleUrls: ['./catalog-cards.component.scss'],
  standalone:false
})
export class CatalogCardsComponent  implements OnInit {
  @Input() catalog:any;
  constructor(public db:Db) { 
  }

  ngOnInit() {}

  update_qty(item:any,type:string){
      if(type === "inc"){
        if((item['qty'] ?? 0) < item.stock){
          item['qty'] = item['qty'] > 0 ? item['qty'] + 1 : 2
        }
      }else{
        item['qty'] = item['qty'] > 0 ? item['qty'] - 1 : 1
      }
  }

  
  async add_to_cart(item:any) {
    const obj = {
      book_name: item.name,
      qty: item.qty
    };
    
    const value = await this.db.add_to_cart(obj);
    console.log(value,"value")

    item['qty'] = 1;
  }





}
