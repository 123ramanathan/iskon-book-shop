import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Db {
  cartItems:any[] = [];
  subtotal:any;
  tax:any;
  path:any;
  private domain = "https://iskcon.m.frappe.cloud"
  private baseUrl:string = "/api/method/iskcon.iskcon.mobile_app_api."
  constructor(private http:HttpClient){}

  formatCurrency(amount:number, currency = "INR", locale = "en-IN") {
    if (isNaN(amount)) return "Invalid number";
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  get_cart_items(){
    this.cartItems = (localStorage['cartItems'] ? JSON.parse(localStorage['cartItems']) : []) || [];
    if(this.cartItems && this.cartItems.length > 0){
      this.calculate_subtotal();
    }
    
    return this.cartItems
  }

  calculate_subtotal(){
    let total = 0;

    for(let i=0;i<this.cartItems.length;i++){
      total += this.cartItems[i]['qty'] * this.cartItems[i]['price']
    }

    this.subtotal = total;
    const taxRate = 0.18
    this.tax = total * taxRate;
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

  callApi<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    params?: any,
    headers?: any
  ): Observable<T> {
    const url = `${this.domain}${endpoint}`;

    // Default headers
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      ...headers,
    });

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      httpHeaders = httpHeaders.set('Authorization', `${storedToken}`);
    }

    const httpParams = new HttpParams({ fromObject: params || {} });

    // Dynamic API method handling
    switch (method) {
      case 'GET':
        return this.http.get<T>(url, { headers: httpHeaders, params: httpParams });
      case 'POST':
        return this.http.post<T>(url, body, { headers: httpHeaders, params: httpParams });
      case 'PUT':
        return this.http.put<T>(url, body, { headers: httpHeaders, params: httpParams });
      case 'DELETE':
        return this.http.delete<T>(url, { headers: httpHeaders, params: httpParams });
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  login(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_login_page.mobile_login_verification";
    return this.callApi(endpoint,"POST",params)
  }

  pos_opening_entry(params:any){
    const endpoint = this.baseUrl + "pos_opening_entry";
    return this.callApi(endpoint,"POST",params)
  }

  pos_closing_entry(params:any){
    const endpoint = this.baseUrl + "pos_closing_entry";
    return this.callApi(endpoint,"POST",params)
  }

  sales_items_with_filters(params:any){
    const endpoint = this.baseUrl + "get_items";
    return this.callApi(endpoint,"POST",params)
  }

  payments_invoice(params:any){
    const endpoint = "/api/method/iskcon.iskcon.iskcon.mobile_app_payments.create_pos_invoice";
    return this.callApi(endpoint,"POST",params)
  }

  store_details(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_header.header_content";
    return this.callApi(endpoint,"POST",params)
  }

  sales_details(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_sales_detail_page.sales_details";
    return this.callApi(endpoint,"POST",params)
  }

  get_stock_reconcilation(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_stock_reconcilation.get_item_details";
    return this.callApi(endpoint,"POST",params)
  }

  headerDetails(){
    let data = {
      user_id: 'umarbenz@gmail.com'
    }
    this.store_details(data).subscribe((res:any)=>{
      console.log(res, "store details");
    });
  }

}
