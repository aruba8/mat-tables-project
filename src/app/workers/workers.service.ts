import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Worker, WorkerType } from './worker.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../shared/authentication.service';
import { AppConfig } from '../app.config';

@Injectable()
export class WorkersService {

  private workersEndPoint = 'http://localhost:8000/workers/';
  private workerTypesEndPoint = 'http://localhost:8000/worker_types/';
  private workers: Worker[];
  workersChanged = new Subject<Worker[]>();
  private baseUrl: string;


  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService,
              private appConfig: AppConfig) {
    this.baseUrl = this.appConfig.api.getBaseUrl();
    this.workersEndPoint = this.baseUrl + this.appConfig.api.endpoints.workers;
    this.workerTypesEndPoint = this.baseUrl + this.appConfig.api.endpoints.workerTypes;
  }

  getWorkers(): Worker[] {
    const authHeaders = this.authService.getAuthorizationHeaders();
    this.httpClient.get<Worker[]>(this.workersEndPoint, {headers: authHeaders}).subscribe(
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
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.get<WorkerType[]>(this.workerTypesEndPoint, {headers: authHeaders});
  }

  getWorker(id: string) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.get<Worker>(this.workersEndPoint + id + '/', {headers: authHeaders});
  }

  addWorker(worker: Worker) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.post<Worker>(this.workersEndPoint, worker, {headers: authHeaders});
  }

  updateWorker(worker: Worker) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.patch(this.workersEndPoint + worker.id + '/', worker, {headers: authHeaders});
  }

  deleteWorker(worker: Worker) {
    const authHeaders = this.authService.getAuthorizationHeaders();
    return this.httpClient.delete(this.workersEndPoint + worker.id + '/', {headers: authHeaders});
  }
}
