import { Component, OnDestroy } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat
} from '@capacitor-mlkit/barcode-scanning';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-barcode-scan',
  templateUrl: './barcode-scan.page.html',
  styleUrls: ['./barcode-scan.page.scss'],
  standalone: false
})
export class BarcodeScanPage implements OnDestroy {

  scannedValue: any = [
    {
      book_name: 'Sriram'
    },
    {
      book_name: 'John'
    },
    {
      book_name: 'Rohan'
    },
    {
      book_name: 'Sudalai'
    },
    {
      book_name: 'Doss'
    },
  ];

  constructor(private navCtrl: NavController) {}

  async ionViewDidEnter() {
    // await this.startScan();
  }

  async startScan() {
    const permission = await BarcodeScanner.requestPermissions();
    if (permission.camera !== 'granted') {
      alert('Camera permission required');
      this.navCtrl.back();
      return;
    }

    const result = await BarcodeScanner.scan({
      formats: [
        BarcodeFormat.QrCode,
        BarcodeFormat.Code128,
        BarcodeFormat.Ean13,
        BarcodeFormat.Ean8
      ],
    });

    if (result.barcodes.length > 0) {
      let data = {
        book_name: result.barcodes[0].rawValue
      }
      this.scannedValue.push(data);
      console.log('Scanned:', this.scannedValue);

      // navigate back or process result
      // this.navCtrl.back();
    }
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }
}