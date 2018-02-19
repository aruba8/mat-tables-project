export class Worker {
    constructor(public id: number,
                public name: string,
                public worker_type: { id: number, worker_type_name: string }) {
    }
}

export class WorkerType {
    constructor(public id: number, public worker_type_name: string) {
    }

}
