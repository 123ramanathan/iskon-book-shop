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
  constructor(private navCtrl: NavController, public db: Db) {}

  ionViewWillEnter(){
    // this.db.scannedBooks = [];
    // this.getScannedBookDetails("Perfect Question Perfect Answer Tamil");

    // this.getScannedBookDetails('Krishna');
  }

  async startScan() {
    const permission = await BarcodeScanner.requestPermissions();
    if (permission.camera !== 'granted') {
      alert('Camera permission required');
      this.navCtrl.back();
      return;
    }

    // On Android we rely on the optional Google barcode scanner module.  If it
    // isn't already installed the plugin will throw the error you saw.  We can
    // proactively check and install it before opening the scanner UI.
    //
    // Note: installGoogleBarcodeScannerModule() only *starts* the download – an
    // event will be fired when the install has finished.  We await that event so
    // the user doesn't tap "Scan" before the module is ready.
    try {
      const avail = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      if (!avail.available) {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
        await new Promise<void>(async (resolve, reject) => {
          const handle = await BarcodeScanner.addListener(
            'googleBarcodeScannerModuleInstallProgress',
            (event: any) => {
              if (event.status === 'installed') {
                handle.remove();
                resolve();
              } else if (event.status === 'failed') {
                handle.remove();
                reject(new Error('Google barcode module installation failed'));
              }
            }
          );
        });
      }
    } catch (e) {
      // If the install fails for whatever reason we still attempt the scan
      // because the API may fallback to the web‑based scanner on iOS/desktop.
      console.warn('barcode module check/install error', e);
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
      // this.db.scannedBooks.push(data);
      // console.log('Scanned:', result.barcodes[0].rawValue);
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

        const existingItemIndex = this.db.scannedBooks.findIndex((item: any) => item.item_code === res.message.items[0].item_code);

        if (existingItemIndex === -1) {
          this.db.scannedBooks.push(...res.message.items);
          res.message.items[0].actual_qty > 0 && this.add_to_cart(res.message.items[0]);
        }else{
          // this.db.scannedBooks[existingItemIndex].qty = this.db.scannedBooks[existingItemIndex].qty + 1;
          this.db.update_qty(this.db.scannedBooks[existingItemIndex],'inc','barcode-scan');
        }

      }else{
        this.db.presentToast("No details found for the scanned book", "danger");
      }
    })
  }

    async add_to_cart(item:any) {
      item['qty'] = item?.qty ?? 1;
      const value = await this.db.add_to_cart(item);
      item['qty'] = 1;
    }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    // this.db.scannedBooks = [];
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }
}