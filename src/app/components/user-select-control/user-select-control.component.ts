import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChatStateService } from 'src/app/services/chat-state.serivice';

@Component({
  selector: 'app-user-select-control',
  templateUrl: './user-select-control.component.html',
  styleUrls: ['./user-select-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectControlComponent implements OnInit {

  public get users(): string[] {
    return this.chatStateService.users;
  }
  public selectedUser = this.users[0];

  constructor(private readonly chatStateService: ChatStateService) { }

  ngOnInit(): void {
  }

  onUserChange() {
    this.chatStateService.currentUser$.next(this.selectedUser);
  }

}
