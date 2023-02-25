
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { switchMap, takeUntil, tap } from 'rxjs';
import { Message } from 'src/app/models';
import { DestroyService } from 'src/app/services';
import { ChatStateService } from 'src/app/services/chat-state.serivice';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ChatComponent implements OnInit {

  public messages!: Message[];

  constructor(
    private readonly chatService: ChatService,
    private readonly chatStateService: ChatStateService, 
    private readonly destroy$: DestroyService,
    private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chatStateService.currentChatId$.pipe(
      switchMap(() => {
        return this.chatService.getLatestMessages()
      }),
      tap((data) => {
        this.messages = this.messagesAdapter(data.fetchLatestMessages);
        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public onSendMessage(text: string): void {
    const tempMessage = this.chatService.makeTempMessage(this.chatStateService.currentUser, text, 'loading');
    this.messages = [...this.messages, tempMessage];

    this.chatService.sendMessage(text).subscribe({
      next: (data) => {
        const message = data?.postMessage;
        if (message) {
          this.messages[this.messages.length-1] = message;
          this.messages = [...this.messages];  
        }
        
        this.changeDetectorRef.markForCheck()
      },
      error: () => {
        this.messages[this.messages.length-1].status = 'error';
        this.messages = [...this.messages];

        this.changeDetectorRef.markForCheck()

      }
    })
  }

  public onReadMore(old: boolean) {
    let messageId;
    if (old) {
      messageId = this.messages[0].messageId;
    } else {
      messageId = this.findLastSuccessMessageId();
    }

    if (messageId) {
      this.chatService.fetchMoreMessages(messageId, old).subscribe((data) => {
        this.messages = this.messagesAdapter([...data.fetchMoreMessages, ...this.messages]);
        this.changeDetectorRef.markForCheck()
      });
    }
  }

  private messagesAdapter(messages: Message[]): Message[] {
    return [...messages].sort((a, b) => new Date(a.datetime) > new Date(b.datetime) ? 1 : -1);
  }

  private findLastSuccessMessageId(): string  {
    let messageId = '';
    for (let i = this.messages.length - 1; i > 0; i--) {
      if (this.messages[i].status !== 'error') {
        messageId = this.messages[i].messageId;
        break;
      }
    }

    return messageId;
  }

}
