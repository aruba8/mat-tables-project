import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  api = new ApiConfig();
  config = {};

  getConfig(): Object {
    return this.config;
  }
}

class ApiConfig {
  public endpoints = {
    orders: 'orders/',
    users: 'users/',
    workers: 'workers/',
  };

  private baseUrls = {
    'localhost': 'http://localhost:8000/',
  };

  getBaseUrl(): string {
    const hostname = window.location.hostname;
    return this.baseUrls[hostname];
  }

}
