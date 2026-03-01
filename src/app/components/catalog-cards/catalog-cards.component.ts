import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-catalog-cards',
  templateUrl: './catalog-cards.component.html',
  styleUrls: ['./catalog-cards.component.scss'],
  standalone:false
})
export class CatalogCardsComponent  implements OnInit {
  @Input() catalog:any;
  @Input() selectedBook:any;
  constructor(public db:Db) { 
  }

  ngOnInit() {
    // if(this.selectedBook){
    //   this.add_to_cart(this.selectedBook);
    // }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['selectedBook'] && changes['selectedBook'].currentValue){
      this.selectedBook = changes['selectedBook'].currentValue;
      this.add_to_cart(this.selectedBook);
    }
  }

  async add_to_cart(item:any) {
    item['qty'] = item?.qty ?? 1;
    const value = await this.db.add_to_cart(item);
    item['qty'] = 1;
    this.selectedBook = null;
  }

}
