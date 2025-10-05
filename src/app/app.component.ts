import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {}

  ngOnInit(){
    this.platform.ready().then(async () => {
      try {
        // Show status bar
        await StatusBar.show();

        // Change background color (Hex format)
        await StatusBar.setBackgroundColor({ color: '#22295e' }); // Ionic primary blue

        // Change text/icons color (LIGHT = white icons, DARK = dark icons)
        await StatusBar.setStyle({ style: Style.Light }); 

        await StatusBar.setOverlaysWebView({ overlay: false });
        // or: Style.Dark
      } catch (err) {
        console.log('StatusBar error:', err);
      }
    });
  }
}
