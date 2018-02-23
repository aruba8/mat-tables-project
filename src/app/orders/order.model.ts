import { UserModel } from '../users/users.model';

export class Order {
  constructor(public id: number,
              public assigned_to: UserModel,
              public order_type: string,
              public created_by: string,
              public order_date: Date,
              public order_status: string,
              public order_description: string) {
  }
}
