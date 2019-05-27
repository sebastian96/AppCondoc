import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        UsersComponent,
        UsersListComponent,
        UserCreateComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class UsersModule { }
