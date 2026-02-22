import { Component, OnDestroy } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat
} from '@capacitor-mlkit/barcode-scanning';
import { NavController } from '@ionic/angular';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-barcode-scan',
  templateUrl: './barcode-scan.page.html',
  styleUrls: ['./barcode-scan.page.scss'],
  standalone: false
})
export class BarcodeScanPage implements OnDestroy {

  // scannedValue: any = [
  //   {
  //     book_name: 'Sriram'
  //   },
  //   {
  //     book_name: 'John'
  //   },
  //   {
  //     book_name: 'Rohan'
  //   },
  //   {
  //     book_name: 'Sudalai'
  //   },
  //   {
  //     book_name: 'Doss'
  //   },
  // ];
  scannedValue: any = [];

  constructor(private navCtrl: NavController, public db: Db) {}

  async ionViewDidEnter() {
    // await this.startScan();
  }

  ionViewWillEnter(){
    // this.scannedValue = [];
    // this.getScannedBookDetails("Perfect Question Perfect Answer Tamil");
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
      // let data = {
      //   book_name: result.barcodes[0].rawValue
      // }
      // this.scannedValue.push(data);
      console.log('Scanned:', result.barcodes[0].rawValue);
      this.getScannedBookDetails(result.barcodes[0].rawValue);
    }
  }

  getScannedBookDetails(bookName: any) {
    let data = {
      "user": localStorage['user_id'],
      "search_book_name": "",
      "language": "",
      "item_group": "All Categories",
      "start": 1,
      "page_length": 10,
      "scan_bar_code": bookName
    }
    this.db.sales_items_with_filters(data).subscribe((res : any) => {
      // console.log(res, "getScannedBookDetails");
      if(res && res.message && res.message.items && res.message.items.length > 0 && res.status == 'Success'){
        this.scannedValue.push(...res.message.items);
      }else{
        this.db.presentToast("No details found for the scanned book", "danger");
      }
    })
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }
}