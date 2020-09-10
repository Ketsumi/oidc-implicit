import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private users:User[]) { }

  public push(user: User) {
    this.users.push(user);
  }

  public pop() {
    this.users.pop();
  }

  public getUsers() {
    return this.users;
  }
}
