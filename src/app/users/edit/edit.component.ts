import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from 'src/app/user';
import { UsersService } from '../../common-services/users.service';
import { of, BehaviorSubject } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { SharedService } from '../shared.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-edit',
  // templateUrl: './edit.component.html',
  templateUrl: '../user-detail/user-detail.component.html',
  // styleUrls: ['./edit.component.css']
  styleUrls: ['../user-detail/user-detail.component.css']
})
export class EditComponent implements OnInit {
  @Input() user: User;
  @ViewChild('editForm') editForm: ElementRef;

  admin = false;
  view = new BehaviorSubject(false);
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
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.shared.getUser().subscribe(user => {
      this.user = user;
      if (!user) {
        this.view.next(false);
      }
      else {
        this.view.next(true);
        this.fillForm();
      }
    })
  }

  ngAfterViewInit() {
    this.view.subscribe(view => {
      if (view) this.editForm.nativeElement.style = "display: flex;";
      else this.editForm.nativeElement.style = "display: none;";
    })
  }

  fillForm() {
    this.userForm.patchValue({
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      data: this.user.data,
      admin: this.user.admin,
    });
    this.tempData = this.user.data;
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
      this.shared.setUser(null);
      // window.location.reload();
      this.shared.setReloadState(true)
    }
  }

  save(): void {
    this.usersService.updateUser(this.userForm.value)
      .subscribe(() => this.shared.setUser(null));
    this.shared.setReloadState(true)
  }

}
