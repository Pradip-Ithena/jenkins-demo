import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from 'src/app/pages/user-management/user-management.component';

const AUTH_API = 'http://localhost:3000/api/';
// const AUTH_API = 'http://65.2.163.29:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  createUser(users: users): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signup', {
      ...users
    }, httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get(AUTH_API + 'users', httpOptions);
  }

  updateUser(id: any, users: users): Observable<any> {
    return this.http.put(AUTH_API + 'updateUser/' + id, users, httpOptions);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(AUTH_API + 'deleteUser/' + id, httpOptions);
  }
}
