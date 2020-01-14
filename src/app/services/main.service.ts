import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private allUserDetailsDataSource = new BehaviorSubject([]);
  private SelectedUserDetails = new BehaviorSubject([]);
  private Suggetions = new BehaviorSubject([]);
  _allSuggetions = this.Suggetions.asObservable();
  _allUserDetails = this.allUserDetailsDataSource.asObservable();
  _selectedUserDetails = this.SelectedUserDetails.asObservable();
  constructor() {
  }
  setAllEmployees(data) {
    this.allUserDetailsDataSource.next(data);
  }
  setSuggetions(data) {
    this.Suggetions.next(data);
  }
  setUserDetails(data) {
    this.SelectedUserDetails.next(data);
  }
}
