import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Order, OrderType } from './order.model';

@Injectable()
export class OrdersService {

  private ordersEndPoint = 'http://localhost:8000/orders/';
  private orderTypesEndPoint = 'http://localhost:8000/order_types/';

  ordersChanged = new Subject<Order[]>();
  orderTypesChanged = new Subject<OrderType[]>();
  orders: Order[];
  orderTypes: OrderType[];

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

  getOrderTypes(): OrderType[] {
    this.httpClient.get<OrderType[]>(this.orderTypesEndPoint).subscribe(
      (orderTypes: OrderType[]) => {
        this.orderTypes = orderTypes;
        this.orderTypesChanged.next(this.orderTypes);
      }
    );
    return this.orderTypes;
  }

}
