import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {
  @Input() home: any;
  @Input() title: any;
  constructor(private navCntrl: NavController) { }

  ngOnInit() {}

  back_route(){
    this.navCntrl.back();
  }

}
