import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userDetails: any;
  selectedUserDetails: any;
  userSuggetions = [];
  suggetions: any;
  suggetionsArray = [];
  selectedUser = [
    {
      key: 'name',
      label: 'Name',
      value: ''
    },
    {
      key: 'age',
      label: 'Age',
      value: ''

    },
    {
      key: 'city',
      label: 'City',
      value: ''

    },
    {
      key: 'mark',
      label: 'Marks',
      value: ''
    }
  ];

  dataObject = [
    { id: 1, name: 'Test 1', age: 27, city: 'Pune', mark: 89, suggestions: [4, 5, 7] },
    { id: 2, name: 'Veer', age: 23, city: 'Surat', mark: 43, suggestions: [1, 3, 7] },
    { id: 3, name: 'Vikas', age: 21, city: 'Banglore', mark: 65, suggestions: [2, 6, 9] },
    { id: 4, name: 'Ravi', age: 27, city: 'Mumbai', mark: 50, suggestions: [1, 4, 8] },
    { id: 5, name: 'Sachin', age: 23, city: 'Chennai', mark: 44, suggestions: [3, 11, 4] },
    { id: 6, name: 'Vidrohi', age: 29, city: 'Vadodara', mark: 72, suggestions: [12, 10, 3] },
    { id: 7, name: 'Ashish', age: 27, city: 'Pune', mark: 89, suggestions: [1, 9, 12] },
    { id: 8, name: 'Amir', age: 23, city: 'Surat', mark: 43, suggestions: [11, 12, 8] },
    { id: 9, name: 'Ravi', age: 21, city: 'Banglore', mark: 65, suggestions: [8, 9, 10] },
    { id: 10, name: 'Sameer', age: 27, city: 'Mumbai', mark: 50, suggestions: [10, 6, 8] },
    { id: 11, name: 'Vikram', age: 23, city: 'Chennai', mark: 44, suggestions: [3, 2, 1] },
    { id: 12, name: 'Jit', age: 29, city: 'Vadodara', mark: 72, suggestions: [4, 5, 7] },
  ];
  constructor(private mainService: MainService) {
    // setting up users data
    this.mainService.setAllEmployees(this.dataObject);
    // getting all users data
    this.mainService._allUserDetails.subscribe((users) => {
      this.userDetails = users;
    });
    // selected user
    this.mainService._selectedUserDetails.subscribe((user) => {
      console.log('subscribed Selected User', user);
      this.selectedUserDetails = user;

      // tslint:disable-next-line: forin
      for (const iterator in this.selectedUserDetails) {
        this.selectedUser.map(
          (ele) => {
            if (ele.key === iterator) {
              ele.value = this.selectedUserDetails[iterator];
            }
          }
        );
      }
    });
    // getting suggested users data
    this.mainService._allSuggetions.subscribe((sugg) => {
      this.suggetions = sugg;
    });
  }

  ngOnInit() {
  }
  onSelectUser(i) {
    this.userSuggetions = [];
    this.suggetionsArray = [];
    let suggLen;
    console.log('selected user ID', i);
    this.dataObject.map(user => {
      if (user.id === i) {
        console.log(user);
        this.mainService.setUserDetails(user);
        // this.userSuggetions = user.suggestions;
        this.suggetionsArray.push(user.suggestions);
        console.log(this.suggetionsArray[0][1]);
        suggLen = this.suggetionsArray[0].length;
      }
    });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < suggLen; i++) {
      this.searchUser(this.suggetionsArray[0][i]);
    }

  }
  searchUser(id) {
    this.userDetails.map((user) => {
      if (user.id === id) {
        this.userSuggetions.push(user);
        console.log(user);
      }

    });
    // console.log('userSuggetions', this.userSuggetions);
    this.mainService.setSuggetions(this.userSuggetions);
  }



}
