import { UserModel } from '../users/users.model';

export class Order {
  constructor(public id: number,
              public assigned_to: UserModel,
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
