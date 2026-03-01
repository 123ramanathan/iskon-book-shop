import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Db } from 'src/app/service/db';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';

@Component({
  selector: 'app-catalog-cards',
  templateUrl: './catalog-cards.component.html',
  styleUrls: ['./catalog-cards.component.scss'],
  standalone:false
})
export class CatalogCardsComponent  implements OnInit {
  @Input() catalog:any;
  @Input() selectedBook:any;
  @Input() delete_btn = false;
  constructor(public db:Db, public modalCtrl: ModalController) { 
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

  async openDeleteModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPopupComponent,
      componentProps: { 
        item: item,
        headerText: "Confirm Delete",
        title: "Are you sure you want to delete this item?",
        btn1: "Yes",
        btn2: "No"
       },
      cssClass: 'confirm-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.confirmed) {
      this.remove_item(item);
    }
  }

  remove_item(item:any){
    this.db.remove_cart_item(item)
  }

}
