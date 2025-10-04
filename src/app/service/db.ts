import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Db {
  cartItems:any[] = []
  constructor(){}

  formatCurrency(amount:number, currency = "INR", locale = "en-IN") {
    if (isNaN(amount)) return "Invalid number";
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  get_cart_items(){
    this.cartItems = (localStorage['cartItems'] ? JSON.parse(localStorage['cartItems']) : []) || [];

    return this.cartItems
  }


  check_and_update(cart:any[],books:any[]){
    if(cart.length === 0) return books;

    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if(cart[i]['name'] === books[j]['name']){
          books[j]['book_qty'] = cart[i]['qty']
        }
      }
    }

    return books;
  }

  add_to_cart(item:any){
    this.cartItems = this.get_cart_items()
    if(this.cartItems && this.cartItems.length > 0){
      const isExist = this.cartItems.findIndex((res:any)=> res['name'] === item.name)
      if(isExist > -1){
        this.cartItems[isExist]['qty'] += item.qty;
      }else{
        this.cartItems.push(item)
      }
    }else{
      this.cartItems = [item]
    }

    localStorage['cartItems'] = JSON.stringify(this.cartItems);

    return this.get_cart_items()
  }

  update_qty(item:any,type:string){
    if(type === "inc"){
      if((item['qty'] ?? 0) < item.stock){
        item['qty'] = item['qty'] > 0 ? item['qty'] + 1 : 2
      }
    }else{
      item['qty'] = item['qty'] > 0 ? item['qty'] - 1 : 1
    }
}
}
