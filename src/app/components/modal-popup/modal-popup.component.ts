import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
  standalone: false
})
export class ModalPopupComponent  implements OnInit {
  @Input() title:any;
  @Input() headerText:any;
  
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  confirm() {
    this.modalCtrl.dismiss({ confirmed: true });
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }

}
