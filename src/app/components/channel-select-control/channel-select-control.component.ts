import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Channel } from 'src/app/models';
import { ChatStateService } from 'src/app/services/chat-state.serivice';

@Component({
  selector: 'app-channel-select-control',
  templateUrl: './channel-select-control.component.html',
  styleUrls: ['./channel-select-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelSelectControlComponent implements OnInit {

  public get channels(): Channel[] {
    return this.chatStateService.channels;
  }
  public selectedChannelId!: string;

  constructor(private readonly chatStateService: ChatStateService) {}

  ngOnInit(): void {
    this.selectedChannelId = this.chatStateService.currentChatId;
  }

  onChannelChange() {
    this.chatStateService.currentChatId$.next(this.selectedChannelId);
  }
}
