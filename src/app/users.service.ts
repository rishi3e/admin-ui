import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  URL =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

  getUsers() {
    return this.httpClient.get(this.URL);
  }
}
