import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  private baseUrlPos:string = "/api/method/iskcon.iskcon.mobile_app_pos."

  header_content:any = {};
  isSearchFocused = false;
  constructor(private http:HttpClient, private toastController: ToastController, private router: Router){}

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
    }else{
      this.subtotal = 0;
    }
    
    return this.cartItems
  }

  calculate_subtotal(){
    let total = 0;

    for(let i=0;i<this.cartItems.length;i++){
      total += this.cartItems[i]['qty'] * (this.cartItems[i]['price_list_rate'] ?? 0)
    }

    this.subtotal = total;
    // const taxRate = 0.18
    // this.tax = total * taxRate;
  }


  check_and_update(cart:any[],books:any[]){
    if(cart.length === 0) return books;

    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if(cart[i]['item_name'] === books[j]['item_name']){
          books[j]['book_qty'] = cart[i]['qty']
        }
      }
    }

    return books;
  }

  add_to_cart(item:any){
    this.cartItems = this.get_cart_items()
    if(this.cartItems && this.cartItems.length > 0){
      const isExist = this.cartItems.findIndex((res:any)=> res['item_name'] === item.item_name)
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
    console.log(item,type);
    if(type === "inc"){

       let qtyExceeds = false;
      if(this.cartItems && this.cartItems.length > 0){
        const isExist = this.cartItems.findIndex((res:any)=> res['item_name'] === item.item_name)
        if(isExist > -1){
          
          let qty = 0;
          if(this.path != '/cart'){
            qty =  this.cartItems[isExist]['qty'] + (item['qty'] > 0 ? item['qty'] + 1 : 2);
          }else{
            qty =  this.cartItems[isExist]['qty'] + 1;
          }
          qtyExceeds = qty > item.actual_qty;

          if(qtyExceeds){
            this.presentToast("Quantity is greater than available stock","danger");
            return;
          }
        }
      }

      if(item.is_stock_item){
        const qty = item['qty'] > 0 ? item['qty'] + 1 : 2;
        qtyExceeds = qty > item.actual_qty;

        if(qtyExceeds){
          this.presentToast("Quantity is greater than available stock","danger");
          return;
        }else{
          item['qty'] = item['qty'] > 0 ? item['qty'] + 1 : item.actual_qty < 2 ? item.actual_qty : 2;
        }
      }

    }else{
      item['qty'] = item['qty'] > 0 ? item['qty'] - 1 : 1
    }
    
    if(this.path === "/cart"){
      for (let i = 0; i < this.cartItems.length; i++) {
        if(item.item_name === this.cartItems[i]['item_name']){
          this.cartItems[i] = item
        }
      }
  
      localStorage['cartItems'] = JSON.stringify(this.cartItems);
  
      this.get_cart_items()
    }
  }

  remove_cart_item(item:any){
    for (let i = 0; i < this.cartItems.length; i++) {
      if(item.item_name === this.cartItems[i]['item_name']){
        this.cartItems.splice(i,1);
        break;
      }
    }

    localStorage['cartItems'] = JSON.stringify(this.cartItems);
    this.get_cart_items();
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
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_pos.pos_opening_entry";
    return this.callApi(endpoint,"POST",params)
  }

  pos_closing_entry(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_pos.pos_closing_entry";
    return this.callApi(endpoint,"POST",params)
  }

  sales_items_with_filters(params:any){
    // pos_profile = Store ID ,search_book_name = Bookname filter,item_group = Item group filter
    const endpoint = this.baseUrlPos + `get_items`;
    return this.callApi(endpoint,"POST",params)
  }

  get_latest_stock_entries(params:any){
    const endpoint = this.baseUrl + "get_latest_stock_entries";
    return this.callApi(endpoint,"POST",params)
  }

  get_all_book_list(params:any){
    const endpoint = this.baseUrl + "get_all_book_list";
    return this.callApi(endpoint,"POST",params)
  }

  get_stock_entry_details(params:any){
    const endpoint = this.baseUrl + "get_stock_entry_details";
    return this.callApi(endpoint,"POST",params)
  }

  get_wrong_books_list(params:any){
    const endpoint = this.baseUrl + "get_wrong_books_list";
    return this.callApi(endpoint,"POST",params)
  }

  submit_books_report(params:any){
    const endpoint = this.baseUrl + "submit_wrong_books_report";
    return this.callApi(endpoint,"POST",params)
  }

  confirm_receipt(params:any){
    const endpoint = this.baseUrl + "confirm_receipt";
    return this.callApi(endpoint,"POST",params)
  }

  payments_invoice(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_payments.create_pos_invoice";
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

  create_stock_reconciliation(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_stock_reconcilation.create_stock_reconciliation";
    return this.callApi(endpoint,"POST",params)
  }

  get_orders(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_order_list.get_orders";
    return this.callApi(endpoint,"POST",params)
  }

  get_reports(params:any){
    const endpoint = "/api/method/iskcon.iskcon.mobile_app_report_page.sales_details";
    return this.callApi(endpoint,"POST",params)
  }

  get_item_group(data: any){
    // const endpoint = this.baseUrlPos + "get_items_group";
    const endpoint = this.baseUrlPos + "get_items_category";
    return this.callApi(endpoint,"POST",data)
  }

  get_confirmed_details(params:any){
    const endpoint = this.baseUrl + "get_confirmed_items";
    return this.callApi(endpoint,"POST",params)
  }

  headerDetails(){
    let data = {
      user: localStorage['username']
    }
    this.store_details(data).subscribe((res:any)=>{
      if(res && res.status == 'Success' && res.message){
        this.header_content = res.message;
        Object.keys(res.message).map((key:any)=>{
          localStorage[key] = res.message[key]
        });

      }else{
        this.header_content = {};
      }
    });
  }

  getImage(image: any) {
    if (!image) return '';
  
    if (image.indexOf('http') === -1) {
      // When the image is a relative path
      return `${this.domain+image}`;
    }
  
    return image; // Already a full URL
  }
  
  async presentToast(message: any, type: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,     // 2 seconds
      position: 'bottom', // 👈 show at bottom
      color: type == 'success' ? 'success' : 'danger',      // optional
    });

    await toast.present();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
