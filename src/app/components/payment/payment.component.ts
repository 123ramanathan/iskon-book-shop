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
  payment:any = {
    type: '',
    cash: 0,
    first_payment_type: 'Select payment type',
    first_payment_amount: 0,
    second_payment_type: 'Select payment type',
    second_payment_amount: 0,
  };
  customer:any={
    customer_name: "",
    customer_phone: null
  }

   
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
      name: 'Card',
      icon: '/assets/icon/card-type.svg',
    },
    {
      name: 'Split',
      icon: '/assets/icon/split-type.svg',
    },
  ];


  payment_select = [
    {name: "Cash"},
    {name: "UPI"},
    {name: "Card"},
  ]

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
      customer_name: this.customer.customer_name,
      customer_phone: this.customer.customer_phone,
    };
    this.db.payments_invoice({invoice_data:params}).subscribe((res: any) => {
      if(res.status === "Success"){
        const thankyouValues = {
          amount: res.message.total_amount,
          mode_of_payment : this.payment.type
        };

        localStorage['thankyou_content'] = JSON.stringify(thankyouValues);
        localStorage.removeItem('cartItems');
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

      case 'Card':
        data= [{
          mode_of_payment: "Credit Card",
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

  split_change(e:any, field:string){
    this.payment[field] = e.target.value;
  }

  payment_amount_change(e:any, field:string){
    // console.log(e.target.value,'e.target.value');
    // console.log(this.payment,'this.payment');
    // console.log(this.db.subtotal, "this.db.subtotal");

    let balance_amount = this.db.subtotal - this.payment.first_payment_amount;
    this.payment[field] = parseFloat(e.target.value);

    if(this.payment.first_payment_amount > this.db.subtotal){
      this.payment.first_payment_amount = this.db.subtotal;
      this.payment.second_payment_amount = 0;
    } else {
      this.payment.second_payment_amount = balance_amount;
    }
  }

}
