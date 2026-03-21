import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() delete_btn = false;
  @Output() add_to_cart = new EventEmitter<any>();
  constructor(public db:Db, public modalCtrl: ModalController) { 
  }

  ngOnInit() {
  }

  // ngOnChanges(changes: SimpleChanges){
  //   if(changes['selectedBook'] && changes['selectedBook'].currentValue){
  //     this.selectedBook = changes['selectedBook'].currentValue;
  //     // if(this.selectedBook.actual_qty > 0){
  //     //   this.add_to_cart.emit(this.selectedBook);
  //     // }
  //   }
  // }



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
     this.db.remove_cart_item(item)
    }
  }

}
