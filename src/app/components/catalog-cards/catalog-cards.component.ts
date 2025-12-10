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

  

  
  async add_to_cart(item:any) {    
    item['qty'] = item?.qty ?? 1;
    const value = await this.db.add_to_cart(item);
  }





}
