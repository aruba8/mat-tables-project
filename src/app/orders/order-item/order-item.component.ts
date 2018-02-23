import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkersService } from '../../workers/workers.service';
import { Worker } from '../../workers/worker.model';
import { UserModel } from '../../users/users.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  order: Order;
  orderId: string;
  editMode: boolean;
  orderFormGroup: FormGroup;
  selectedOrderStatus: string;
  orderStatuses = [
    {'id': 'NE', 'name': 'New'},
    {'id': 'AC', 'name': 'Accepted'},
    {'id': 'AG', 'name': 'Assigned'},
    {'id': 'ST', 'name': 'Started'},
    {'id': 'IP', 'name': 'In Progress'},
    {'id': 'DN', 'name': 'Done'},
    {'id': 'IV', 'name': 'Invoiced'},
    {'id': 'PD', 'name': 'Paid'}
  ];
  workers: Worker[];
  worker: Worker;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ordersService: OrdersService,
              private workersService: WorkersService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.orderId = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    this.workers = this.workersService.getWorkers();
  }

  initForm() {
    this.order = new Order(-1, {
      'id': -1,
      'first_name': '',
      'last_name': '',
      'email': '',
      'middle_name': ''
    }, '', '', new Date(), 'IV', '');
    this.populateForm(this.order);
    if (this.editMode) {
      this.ordersService.getOrder(this.orderId).subscribe(
        (order: Order) => {
          this.order = order;
          this.populateForm(this.order);
          console.log(this.order);
        }
      );
    }
  }

  populateForm(order: Order) {
    const orderStatus = this.findOrderStatus(order.order_status);
    this.orderFormGroup = new FormGroup({
      'orderDate': new FormControl(order.order_date),
      'orderStatus': new FormControl(orderStatus.id),
      'orderType': new FormControl(order.order_type),
      'createdBy': new FormControl(order.created_by),
      'assignedTo': new FormControl(order.assigned_to),
      'orderDescription': new FormControl(order.order_description),
    });
  }

  findOrderStatus(id: string) {
    return this.orderStatuses.filter(x => x.id === id)[0];
  }

}
