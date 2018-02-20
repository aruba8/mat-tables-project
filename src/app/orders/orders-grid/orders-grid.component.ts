import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order } from '../order.model';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-orders-grid',
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.css']
})
export class OrdersGridComponent implements OnInit {

  displayedColumns = ['id', 'assigned_to', 'order_type', 'created_by', 'order_date', 'order_status', 'order_description', 'action'];
  dataSource;
  orders: Order[];
  ordersSubscription: Subscription;

  constructor(private ordersService: OrdersService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.orders = this.ordersService.getOrders();
    this.ordersSubscription = this.ordersService.ordersChanged.subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.dataSource = new MatTableDataSource(this.orders);
      }
    );


  }

  openOrder(id: string) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  onAddOrder() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
