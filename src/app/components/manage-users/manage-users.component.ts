import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  Users: any = [];
  UsersLength?: number;
  allComplete: boolean = false;
  IndeterminateColor: string = 'primary';
  ELEMENT_DATA: any[] = [];
  searchTerm: string = '';
  changBackground: boolean[] = Array(10).fill(false);

  constructor(public userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      // console.log(data);
      this.Users = data;
      this.Users = this.Users.map((obj: { '': any }) => {
        return { ...obj, completed: false, color: 'warn' };
      });
      // console.log(this.Users);

      this.UsersLength = this.Users.length;
      // console.log(this.UsersLength);

      this.ELEMENT_DATA = this.Users.slice(0, 10);
      // console.log(this.ELEMENT_DATA);
    });
  }

  updateAllComplete() {
    this.allComplete =
      this.ELEMENT_DATA != null &&
      this.ELEMENT_DATA.every((t: { completed: any }) => t.completed);
  }

  someComplete(): boolean {
    if (this.ELEMENT_DATA == null) {
      return false;
    }
    return (
      this.ELEMENT_DATA.filter((t: { completed: any }) => t.completed).length >
        0 && !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.ELEMENT_DATA == null) {
      return;
    }
    this.ELEMENT_DATA.forEach(
      (t: { completed: boolean }) => (t.completed = completed)
    );
  }

  showAllBackground() {
    this.ELEMENT_DATA.forEach((arr: any, index: number) => {
      // console.log(arr.completed)
      if (arr.completed !== false) {
        this.changBackground.splice(index, 1, true);
      } else {
        this.changBackground.splice(index, 1, false);
      }
    });
  }

  showBackground(index: number) {
    // console.log(index);
    let indexColorCheck = this.changBackground[index];
    // console.log(indexColorCheck);
    indexColorCheck === false
      ? this.changBackground.splice(index, 1, true)
      : this.changBackground.splice(index, 1, false);
  }

  clearHighlightRow() {
    this.changBackground.fill(false);
  }

  deleteEntry(index: number) {
    // console.log(index)
    this.ELEMENT_DATA.splice(index, 1);
    this.Users.splice(index, 1);
    this.UsersLength = this.Users.length;
    this.clearHighlightRow();
  }

  deleteSelected() {
    let tempArr: any = [];
    this.ELEMENT_DATA.forEach((arr: any) => {
      if (arr.completed !== false) {
        tempArr.push(arr.id);
      }
    });
    // console.log(tempArr);

    let length = tempArr.length;
    for (let i = 0; i < length; i++) {
      this.deleteAtIndexFunc(tempArr[i]);
    }

    this.ELEMENT_DATA = this.Users.slice(0, 10);
    this.UsersLength = this.Users.length;
    this.clearHighlightRow();
  }

  deleteAtIndexFunc(i: number) {
    // console.log(i);
    const index = this.Users.findIndex((arr: any) => arr.id === i);
    // console.log(index);
    // const removeArr = this.Users.splice(index, 1);
    // console.log(removeArr);
    this.Users.splice(index, 1);
  }

  OnPageChange(event: any) {
    // console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.Users.length) {
      endIndex = this.Users.length;
    }
    this.ELEMENT_DATA = this.Users.slice(startIndex, endIndex);
    this.clearHighlightRow();
    this.setAll(false);
  }

  editEntry(index: number) {
    let tempArr = this.Users.splice(index, 1);
    // console.log(tempArr);
    // console.log(tempArr[0].id)
    let tempObj = tempArr[0];
    const name = prompt('Enter updated name');
    // console.log(name);
    const email = prompt('Enter updated email');
    const role = prompt('Enter updated role');
    tempObj.name =
      name === '' || (!name && typeof name == 'object') ? tempObj.name : name;
    tempObj.email =
      email === '' || (!email && typeof email == 'object')
        ? tempObj.email
        : email;
    tempObj.role =
      role === '' || (!role && typeof role == 'object') ? tempObj.role : role;
    // console.log(tempObj);
    this.Users.splice(index, 0, tempObj);
    this.ELEMENT_DATA = this.Users.slice(0, 10);
  }
}
