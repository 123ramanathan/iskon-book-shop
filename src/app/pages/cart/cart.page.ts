import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPopupComponent } from 'src/app/components/modal-popup/modal-popup.component';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage implements OnInit {
  discount:any;
  subtotal:any;
  tax:any;
  constructor(public db:Db,private modalCtrl: ModalController) { }

  ngOnInit() {
    this.db.get_cart_items();
    
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

  }



  onSelect(value: string) {
    console.log('Selected:', value);
  }

  tax_calc() {
    
  }
  

}
