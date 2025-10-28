import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() backRoute: any;
  constructor(private navCntrl: NavController, private router: Router) { }

  ngOnInit() {}

  back_route(){
    if(this.backRoute){
      this.router.navigateByUrl(this.backRoute);
    }else{
      this.navCntrl.back();
    }
  }

}
