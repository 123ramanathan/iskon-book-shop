import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPopupComponent } from 'src/app/components/modal-popup/modal-popup.component';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-close-shift',
  templateUrl: './close-shift.page.html',
  styleUrls: ['./close-shift.page.scss'],
  standalone: false
})
export class CloseShiftPage implements OnInit {
  report_details: any = {};
  constructor(public db: Db, public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    // this.getDashboardDetails();
    this.get_reports();
  }


  get_reports(){
    const params = {
      pos_profile: localStorage['store_name'],
      user: localStorage['user_id']
    }
    this.db.get_reports(params).subscribe((res:any)=>{
      if(res.message){
        this.report_details = res.message;
      }
    })
  }

  closeShift(){
    let data = {
      user: localStorage['username']
    }
    this.db.pos_closing_entry(data).subscribe((res:any)=>{
      if(res && res.message && res.status == 'Success'){
        this.db.presentToast(res.message.message, 'success');
        this.db.logout();
      }else{
        this.db.presentToast(res.message.message, 'error');
      }
    });
  }

  async confirmCloseShift() {
    const modal = await this.modalCtrl.create({
      component: ModalPopupComponent,
      componentProps: { 
        headerText: "Confirm Close Shift",
        title: "Are you sure you want to Close Shift?",
        btn1: "Yes",
        btn2: "No"
        },
      cssClass: 'confirm-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.confirmed) {
      this.closeShift();
    }
  }

  // getDashboardDetails(){
  //   let data = {
  //     pos_profile: localStorage['store_name']
  //   }
  //   this.db.sales_details(data).subscribe((res:any)=>{
  //     console.log(res, "sales details");
  //     if(res && res.status == "Success" && res.message){
  //       this.report_details = res.message;
  //     }else{
  //       this.report_details = {};
  //     }
  //   });
  // }

}
