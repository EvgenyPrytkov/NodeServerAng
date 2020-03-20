import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../user';
import { Validators, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SharedService } from '../shared.service';
import { UsersService } from 'src/app/common-services/users.service';

@Component({
  selector: 'app-user-dialog',
  // templateUrl: './user-dialog.component.html',
  // styleUrls: ['./user-dialog.component.css'],
  templateUrl: '../user-detail/user-detail.component.html',
  styleUrls: ['../user-detail/user-detail.component.css']
})
export class UserDialogComponent implements OnInit {

  admin = false;
  tempData = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  userForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.pattern('^(.*[A-z])[ ](.*[A-z])$')]],
    email: ['', [Validators.pattern('^(.*[A-z])[@](.*[A-z])[.](ru|org|net|com)$'), Validators.required]],
    data: [''],
    admin: [false],
  });

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private fb: FormBuilder,
    private shared: SharedService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userForm.patchValue({
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      data: this.user.data,
      admin: this.user.admin,
    });
    this.admin = this.user.admin;
    if (!this.user.admin) {
      this.userForm.controls.name.disable();
      this.userForm.controls.email.disable();
    } else {
      this.userForm.controls.name.enable();
      this.userForm.controls.email.enable();
    }
  }

  addData(event: MatChipInputEvent): void {
    if ((event.value || '').trim()) this.user.data.push(event.value.trim())
    if (event.input) event.input.value = '';
  }

  removeData(data: string): void {
    const index = this.user.data.indexOf(data);

    if (index >= 0) {
      this.user.data.splice(index, 1);
    }
  }

  cancel(): void {
    if (confirm("Are you sure?")) {
      this.dialogRef.close();
      this.shared.setReloadState(true)
    }
  }

  save(): void {
    this.usersService.updateUser(this.userForm.value)
      .subscribe(() => this.dialogRef.close());
    this.shared.setReloadState(true)
  }

}
