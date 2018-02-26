import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, OrderType } from '../order.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkersService } from '../../workers/workers.service';
import { Worker } from '../../workers/worker.model';
import { Subscription } from 'rxjs/Subscription';
import { UserModel } from '../../users/users.model';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit, OnDestroy {
  order: Order;
  orderId: string;
  editMode: boolean;
  orderFormGroup: FormGroup;
  selectedOrderStatus: string;
  selectedWorker: string;
  selectedOrderType: string;
  workersSubscription: Subscription;
  orderTypesSubscription: Subscription;
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
  orderTypes: OrderType[];
  workers: Worker[];
  worker: Worker;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ordersService: OrdersService,
              private workersService: WorkersService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.workers = this.workersService.getWorkers();
    this.orderTypes = this.ordersService.getOrderTypes();
    this.route.params.subscribe(
      (params: Params) => {
        this.orderId = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    this.workersSubscription = this.workersService.workersChanged.subscribe(
      (workers: Worker[]) => {
        this.workers = workers;
        this.populateForm(this.order);
      }
    );
    this.orderTypesSubscription = this.ordersService.orderTypesChanged.subscribe(
      (orderTypes: OrderType[]) => {
        this.orderTypes = orderTypes;
        this.populateForm(this.order);
      }
    );
  }

  ngOnDestroy(): void {
    this.workersSubscription.unsubscribe();
    this.orderTypesSubscription.unsubscribe();
  }


  initForm() {
    this.order = new Order(-1, new Worker(-1, '', {
      id: -1,
      worker_type_name: ''
    }), new OrderType(-1, ''), new UserModel(-1, '', '', '', ''), new Date(), 'NE', '');
    this.populateForm(this.order);
    if (this.editMode) {
      this.ordersService.getOrder(this.orderId).subscribe(
        (order: Order) => {
          this.order = order;
          this.populateForm(this.order);
        }
      );
    }
  }

  populateForm(order: Order) {
    const orderStatus = this.findOrderStatus(order.order_status);
    const dateOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    };
    this.orderFormGroup = new FormGroup({
      'orderDate': new FormControl(new Date(order.order_date).toLocaleDateString(undefined, dateOptions)),
      'createdBy': new FormControl(order.created_by.first_name + ' ' + order.created_by.last_name),
      'orderDescription': new FormControl(order.order_description),
      'orderStatus': new FormControl(orderStatus.id, [Validators.required]),
      'assignedTo': new FormControl(order.assigned_to.id, [Validators.required]),
      'orderType': new FormControl(order.order_type.id, [Validators.required]),
    });
  }

  findOrderStatus(id: string) {
    return this.orderStatuses.filter(x => x.id === id)[0];
  }

  onBack() {
    this.router.navigate(['orders']);
  }

  onSaveOrder() {
    this.order.order_status = this.orderFormGroup.value.orderStatus;
    this.order.assigned_to = this.orderFormGroup.value.assignedTo;
    this.order.order_description = this.orderFormGroup.value.orderDescription;
    this.order.order_type = this.orderFormGroup.value.orderType;
    console.log(this.order);

    this.ordersService.updateOrder(this.order).subscribe(
      () => {
        this.openSnackBar('Order saved', 'close', 'snack');
      },
      (error) => {
        this.openSnackBar('Something went wrong on order saving', 'close', 'snack');
      }
    );
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'order with id:' + this.order.id,
        entityName: 'order'
      }
    });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result === true) {
          this.ordersService.deleteOrder(this.order).subscribe(() => {
            this.router.navigate(['orders']);
          });
        }
      }
    );
  }

  private openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
      extraClasses: [className]
    });
  }

  getSelectedWorker(id: number) {
    return this.workers.filter(x => x.id === id)[0];
  }

  getSelectedOrderType(id: number) {
    return this.orderTypes.filter(x => x.id === id)[0];
  }

}
