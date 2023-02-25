import { Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter 
} from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { Message } from 'src/app/models';
import { DestroyService } from 'src/app/services';
import { ChatStateService } from 'src/app/services/chat-state.serivice';

@Component({
  selector: 'app-messages-area',
  templateUrl: './messages-area.component.html',
  styleUrls: ['./messages-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class MessagesAreaComponent implements OnInit, OnChanges {
  @ViewChild('messageContainer') private messageContainerRef!: ElementRef;
  @Input() messages!: Message[];
  @Output() public readMore = new EventEmitter<boolean>();

  public currentChannelLabel = this.findChannelLabel(this.chatStateService.currentChatId);
  public currentUser = this.chatStateService.currentUser;


  constructor(
    private readonly chatStateService: ChatStateService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService
  ) {}


  ngOnInit(): void {
    this.chatStateService.currentChatId$.pipe(
      tap((id) => {
        this.currentChannelLabel = this.findChannelLabel(id);
        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe();


    this.chatStateService.currentUser$.pipe(
      tap((user) => {
        this.currentUser = user;
        this.changeDetectorRef.markForCheck();
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.scrollToBottom();
  }

  public trackByFn(index: number, message: Message): string {
    return `${message.messageId}_${message.status}`;
  }

  public getAvatar(message: Message) {
    return `https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${message.userId}.png`
  }

  public onReadMoreOld() {
    this.readMore.emit(true);
  }

  public onReadMoreNew() {
    this.readMore.emit(false);
  }

  private findChannelLabel(id: string): string | undefined {
    return this.chatStateService.channels.find((v) => v.id === id)?.label;
  }

  private scrollToBottom(): void {
    try {
      this.messageContainerRef.nativeElement.scrollTop = this.messageContainerRef.nativeElement.scrollHeight;
    } catch(err) { }
  }

  


 
}
