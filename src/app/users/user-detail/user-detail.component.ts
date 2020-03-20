import { Component, OnInit, Input } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from 'src/app/user';
import { UsersService } from '../../common-services/users.service';
import { of } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;

  admin = false;

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usersService.getUser(id)
      .subscribe(user => {
        this.user = user.find(x => x.id === id);
        if (user.length != 0)
          this.fillForm();
        else {
          this.router.navigate(['users']);
        }
      });
  }

  fillForm() {
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
    if (confirm("Are you sure?")) this.router.navigate(['users'])
  }

  save(): void {
    this.usersService.updateUser(this.userForm.value)
      .subscribe(() => this.router.navigate(['users']));
  }

}
