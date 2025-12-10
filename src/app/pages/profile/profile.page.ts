import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Db } from 'src/app/service/db';
import { ModalPopupComponent } from 'src/app/components/modal-popup/modal-popup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  constructor(private alertController: AlertController, private router: Router, public db: Db, public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.db.headerDetails();
  }

  // async confirmLogout() {
  //   const alert = await this.alertController.create({
  //     header: 'Logout',
  //     message: 'Do you want to logout?',
  //     buttons: [
  //       {
  //         text: 'No',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.logout();
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  async confirmLogout() {
    const modal = await this.modalCtrl.create({
      component: ModalPopupComponent,
      componentProps: { 
        headerText: "Confirm Logout",
        title: "Are you sure you want to Logout?",
        btn1: "Yes",
        btn2: "No"
       },
      cssClass: 'confirm-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.confirmed) {
      this.db.logout();
    }
  }

}
