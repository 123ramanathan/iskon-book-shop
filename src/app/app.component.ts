import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NavController, Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Db } from './service/db';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private platform: Platform, 
    private router: Router, 
    private alertController: AlertController, 
    public db: Db,
    private navCtrl: NavController
  ) {}

  ngOnInit(){

    this.db.headerDetails();

    this.platform.ready().then(async () => {
      try {
        // Show status bar
        await StatusBar.show();

        // Change background color (Hex format)
        await StatusBar.setBackgroundColor({ color: '#22295e' }); // Ionic primary blue

        await StatusBar.setOverlaysWebView({ overlay: false });
        // or: Style.Dark

      } catch (err) {
        console.log('StatusBar error:', err);
      }
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/login' || this.router.url === '/tabs/sales') { // Check if on login page
        this.showExitConfirmation();
      }else{
        this.navCtrl.back();
      }
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.db.path = event.url;
        if(!(this.db.path.includes('transfer-receipt') && this.db.path.includes('wrong-receipt'))){
          localStorage.removeItem('wrong_books');
           localStorage.removeItem('stock_entry_list');
        }

        console.log('Current URL:', this.db.path);
      }
    });
  }

  async showExitConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirm Exit',
      message: 'Do you really want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => {
            App.exitApp();
          },
        },
      ],
    });

    await alert.present();
  }
}
