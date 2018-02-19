export class Worker {
  constructor(public id: number,
              public name: string,
              public worker_type: {id: number, worker_type_name: string}) {
  }
}
