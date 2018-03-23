import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Order, OrderType } from './order.model';
import { AuthenticationService } from '../shared/authentication.service';
import { AppConfig } from '../app.config';

@Injectable()
export class OrdersService {

  private ordersEndPoint;
  private orderTypesEndPoint;

  ordersChanged = new Subject<Order[]>();
  orderTypesChanged = new Subject<OrderType[]>();
  private orders: Order[];
  private orderTypes: OrderType[];
  private baseUrl: string;


  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService,
              private appConfig: AppConfig) {
    this.baseUrl = this.appConfig.api.getBaseUrl();
    this.ordersEndPoint = this.baseUrl + this.appConfig.api.endpoints.orders;
    this.orderTypesEndPoint = this.baseUrl + this.appConfig.api.endpoints.orderTypes;
  }

  getOrders(): Order[] {
    const authHeaders = this.authService.getAuthorizationHeaders();
    this.httpClient.get<Order[]>(this.ordersEndPoint, {headers: authHeaders}).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.ordersChanged.next(this.orders);
      }
    );
    return this.orders;
  }

  getOrder(id: string) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.get<Order>(this.ordersEndPoint + id + '/', {headers: authHeaders});
  }

  getOrderTypes(): OrderType[] {
    const authHeaders = this.authService.getAuthorizationHeaders();
    this.httpClient.get<OrderType[]>(this.orderTypesEndPoint, {headers: authHeaders}).subscribe(
      (orderTypes: OrderType[]) => {
        this.orderTypes = orderTypes;
        this.orderTypesChanged.next(this.orderTypes);
      }
    );
    return this.orderTypes;
  }

  deleteOrder(order: Order) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.delete(this.ordersEndPoint + order.id + '/', {headers: authHeaders});
  }

  updateOrder(order: Order) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.patch(this.ordersEndPoint + order.id + '/', order, {headers: authHeaders});
  }

}
