import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Order } from './order.model';

@Injectable()
export class OrdersService {

  private ordersEndPoint = 'http://localhost:8000/orders/';
  ordersChanged = new Subject<Order[]>();
  orders: Order[];

  constructor(private httpClient: HttpClient) {
  }

  getOrders(): Order[] {
    this.httpClient.get<Order[]>(this.ordersEndPoint).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.ordersChanged.next(this.orders);
      }
    );
    return this.orders;
  }

  getOrder(id: string) {
    return this.httpClient.get<Order>(this.ordersEndPoint + id + '/');
  }

}
