import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectControlComponent } from './user-select-control.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserSelectControlComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UserSelectControlComponent]
})
export class UserSelectControlModule { }
