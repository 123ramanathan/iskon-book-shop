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
  phone_error = false;

   
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
    if(!this.phone_error){

      if(!this.payment?.type){
        this.db.presentToast('Please select a payment type', 'error');
        return;
      }

      // Validate total payment against subtotal
      const totalPayment = this.computeTotalPayment();
      const subtotal = this.db.subtotal ?? 0;
      if(totalPayment < subtotal){
        this.db.presentToast('Payment amount is less than the total amount', 'error');
        return;
      }

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
        user: localStorage['username']
      };
      this.db.payments_invoice({invoice_data:params}).subscribe((res: any) => {
        if(res.status === "Success"){
          const thankyouValues = {
            amount: res.message.total_amount,
            mode_of_payment : this.payment.type,
            customer_name: this.customer.customer_name,
            customer_phone: this.customer.customer_phone
          };
  
          localStorage['thankyou_content'] = JSON.stringify(thankyouValues);
          localStorage.removeItem('cartItems');
          this.navCtrl.navigateForward('/thankyou');
          this.payment = {
            type: '',
            cash: 0,
            first_payment_type: 'Select payment type',
            first_payment_amount: 0,
            second_payment_type: 'Select payment type',
            second_payment_amount: 0,
          };
          this.customer = {
            customer_name: "",
            customer_phone: null
          };
        }else{
          if(res && res.message && res.message.message){
            this.db.presentToast(res.message.message, 'error');
          }else{
            this.db.presentToast('Something went wrong, please try again', 'error');
          }
        }
      });
    }else{
      this.db.presentToast('Please give a valid mobile number', 'error');
    }
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

  split_change(e:any, field:any){
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

  validatePhone(event:any){
    if(event.target.value.length >= 10){
      this.phone_error = false;
      event.target.value = event.target.value.slice(0,10);
      this.customer.customer_phone = event.target.value;
    }else if(event.target.value.length < 10){
      this.phone_error = true;
    }
  }

  computeTotalPayment() {
    const subtotal = this.db.subtotal ?? 0;
    if(this.payment?.type === 'Split'){
      const first = Number(this.payment.first_payment_amount) || 0;
      const second = Number(this.payment.second_payment_amount) || 0;
      return first + second;
    }

    // For single payments use entered cash (or fallback to subtotal)
    return Number(this.payment.cash) || subtotal;
  }

  equalCost(payment:any){
    if(payment.cash){
      payment.variance = payment.cash - this.db.subtotal;
    }else{
      payment.variance = 0;
    }
  }

}
