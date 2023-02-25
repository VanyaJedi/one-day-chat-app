import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingAreaComponent implements OnInit {

  public text = '';

  constructor(private readonly chatService: ChatService) { }
  @Output() public sendMessage = new EventEmitter<string>();

  ngOnInit(): void {
  }

  public onSendMessage(): void {
    this.sendMessage.emit(this.text);
    this.text = '';
  }



}
