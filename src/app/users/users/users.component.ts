import { Component, OnInit, DoCheck } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../../user';
import { UsersService } from '../../common-services/users.service';
import { SharedService } from '../shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),]),
  ]
})
export class UsersComponent implements OnInit, DoCheck {
  users: User[];
  columnsToDisplay = ['ID', 'Name'];
  expandedUser: User | null;
  isReadyToReload: boolean

  constructor(
    private usersService: UsersService,
    private shared: SharedService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.shared.setUser(null);
    this.getUsers();
    this.shared.readyForReload().subscribe(ready => this.isReadyToReload = ready)
  }

  ngDoCheck() {
    if (this.isReadyToReload) {
      this.getUsers()
      this.shared.setReloadState(false)
    }
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

  setUser(user: User) {
    this.shared.setUser(user)
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      // width: '250px',
      data: user,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

}
