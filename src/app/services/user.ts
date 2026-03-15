import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  UserName:BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {
  }
}
