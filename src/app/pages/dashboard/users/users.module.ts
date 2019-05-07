import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UserCreateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule {}
