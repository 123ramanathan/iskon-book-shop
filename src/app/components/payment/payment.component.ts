import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { first } from 'rxjs';
import { Db } from 'src/app/service/db';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: false,
})
export class PaymentComponent implements OnInit {
  // selected_payment_type: any;
  payment = {
    type: '',
    cash: 0,
    first_payment_type: '',
    first_payment_amount: 0,
    second_payment_type: '',
    second_payment_amount: 0,
  };

    customer_name:any = ""
   
  constructor(public db: Db,private navCtrl:NavController) {}

  ngOnInit() {}

  payment_types: any = [
    {
      name: 'Cash',
      icon: '/assets/icon/cash-type.svg',
    },
    {
      name: 'UPI',
      icon: '/assets/icon/upi-type.svg',
    },
    {
      name: 'Credit Card',
      icon: '/assets/icon/card-type.svg',
    },
    {
      name: 'Split',
      icon: '/assets/icon/split-type.svg',
    },
  ];

  selected_payment(item: any) {
    // this.selected_payment_type = item.name;
    this.payment['type'] = item.name;
  }

  create_invoice() {
    let items:any=[] = [];

    for (let i = 0; i < this.db.cartItems.length; i++) {
      let data = {
        "item_code": this.db.cartItems[i].item_code,
        "qty": this.db.cartItems[i].qty,
        "rate": this.db.cartItems[i].price_list_rate ?? 0,
      }
      items.push(data)
    }
    const params = {
      pos_profile: localStorage['store_name'],
      items: items,
      payments: this.generate_payment_method(),
      customer_name: this.customer_name
    };
    this.db.payments_invoice({invoice_data:params}).subscribe((res: any) => {
      console.log(res, 'res');
      if(res.status === "Success"){
        const thankyouValues = {
          amount: res.message.total_amount,
          mode_of_payment : this.payment.type
        };

        localStorage['thankyou_content'] = JSON.stringify(thankyouValues);
        this.navCtrl.navigateForward('/thankyou');
      }
    });
  }

  generate_payment_method() {
    let data:any = []
    switch (this.payment?.type) {
      case 'UPI':
        data = [{
          mode_of_payment: this.payment?.type,
          amount: this.db.subtotal,
        }];
        break;

      case 'Credit Card':
        data= [{
          mode_of_payment: this.payment?.type,
          amount: this.db.subtotal,
        }];
        break;

      case 'Cash':
        data = [{
          mode_of_payment: this.payment?.type,
          amount: this.db.subtotal,
        }];
        break;

      case 'Split':
        data = [
          {
            mode_of_payment: this.payment?.first_payment_type,
            amount: this.payment?.first_payment_amount,
          },
          {
            mode_of_payment: this.payment?.second_payment_type,
            amount: this.payment?.second_payment_amount,
          },
        ];
        break;

      default:
        data =[];
        break;
    }

    return data;
  }
}
