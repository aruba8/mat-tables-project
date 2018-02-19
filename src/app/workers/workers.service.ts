import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Worker, WorkerType } from './worker.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkersService {

    private workersEndPoint = 'http://localhost:8000/workers/';
    private workerTypesEndPoint = 'http://localhost:8000/worker_types/';
    private workers: Worker[];
    workersChanged = new Subject<Worker[]>();


    constructor(private httpClient: HttpClient) {
    }

    getWorkers(): Worker[] {
        this.httpClient.get<Worker[]>(this.workersEndPoint).subscribe(
            (workers: Worker[]) => {
                this.workers = workers;
                this.workersChanged.next(this.workers);
            }, (error) => {
                console.log(error);
            }
        );
        return this.workers;
    }

    getWorkerTypes() {
        return this.httpClient.get<WorkerType[]>(this.workerTypesEndPoint);
    }

    getWorker(id: string) {
        return this.httpClient.get<Worker>(this.workersEndPoint + id + '/');
    }

    addWorker(worker: Worker) {
        return this.httpClient.post<Worker>(this.workersEndPoint, worker);
    }

    updateWorker(worker: Worker) {
        return this.httpClient.patch(this.workersEndPoint + worker.id + '/', worker);
    }

    deleteWorker(worker: Worker) {
        return this.httpClient.delete(this.workersEndPoint + worker.id + '/');
    }
}
