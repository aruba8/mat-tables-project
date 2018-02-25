import { UserModel } from '../users/users.model';
import { Worker } from '../workers/worker.model';

export class Order {
  constructor(public id: number,
              public assigned_to: Worker,
              public order_type: OrderType,
              public created_by: UserModel,
              public order_date: Date,
              public order_status: string,
              public order_description: string) {
  }
}

export class OrderType {
  constructor(public id: number,
              public order_type_name: string) {
  }
}
