import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelSelectControlComponent } from './channel-select-control.component';



@NgModule({
  declarations: [ChannelSelectControlComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChannelSelectControlComponent]
})
export class ChannelSelectControlModule { }
