import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';
import { UserService } from 'src/app/shared/services/user.service';
import notify from 'devextreme/ui/notify';

export interface users {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  userData: any
  loading = false;
  namePattern: any = /^[^0-9]+$/;
  passPattern:any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.updateUser = this.updateUser.bind(this)
    this.addNewUser = this.addNewUser.bind(this)
  }

  //get all users data
  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.userData = res;
      // console.log("res", res)
    })
  }

  //add new user 
  addNewUser(e: any) {
    delete e.data["id"];
    this.loading = true;
    this.userService.createUser(e.data).subscribe({
      next: (result: any) => {
        this.getUsers()
        notify("User was added successfully", 'success', 2000);
        console.log("User was added successfully.", result);
      },
      error: (err: any) => {
        console.log(err);
        notify(err.error, 'error', 2000);
      }
    });
  }

  //update user detials
  updateUser(e: any) {
    this.userService.updateUser(e.data.id, e.data).subscribe({
      next: (result: any) => {
        this.getUsers()
        notify("User was updated successfully", 'success', 7000);
        console.log("User was updated successfully", result);
      },
      error: (err: any) => {
        console.log(err);
        notify(err.error, 'error', 2000);
      }
    });
  }

  //delete user 
  deleteUser(e: any) {
    this.userService.deleteUser(e.data.id).subscribe({
      next: (result: any) => {
        this.getUsers()
        notify("User was Deleted successfully", 'success', 2000);
        console.log("User was Deleted successfully", result);
      },
      error: (err: any) => {
        console.log(err);
        notify(err.error, 'error', 2000);
      }
    });
  }

}
