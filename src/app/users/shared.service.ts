import { Injectable } from '@angular/core';
import { UsersModule } from './users.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private user = new BehaviorSubject(null);
  private reload = new BehaviorSubject(false);

  getUser(): Observable<User | null> {
    return this.user.asObservable();
  }

  setUser(value: User | null) {
    this.user.next(value);
  }

  setReloadState(value: boolean) {
    this.reload.next(value)
  }
  
  readyForReload() {
    return this.reload.asObservable()
  }

}
