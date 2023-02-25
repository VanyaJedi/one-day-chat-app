import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingAreaComponent } from './typing-area.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TypingAreaComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TypingAreaComponent]
})
export class TypingAreaModule { }
