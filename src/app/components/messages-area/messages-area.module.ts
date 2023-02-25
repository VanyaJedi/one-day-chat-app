import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesAreaComponent } from './messages-area.component';



@NgModule({
  declarations: [MessagesAreaComponent],
  imports: [
    CommonModule
  ],
  exports: [MessagesAreaComponent]
})
export class MessagesAreaModule {}
