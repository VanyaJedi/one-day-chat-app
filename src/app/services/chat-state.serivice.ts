import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


const CHANNELS = [
  {
    id: "1",
    label: "General Channel"
  },
  {
    id: "2",
    label: "Technology Channel"
  },
  {
    id: "3",
    label: "LGTM Channel"
  },
];

const USERS = ['Sam', 'Russell', 'Joyse'];



@Injectable({
  providedIn: 'root',
})
export class ChatStateService {
  public channels = CHANNELS;
  public users = USERS;

  public currentUser$ = new BehaviorSubject<string>(this.users[0]);
  public currentChatId$ = new BehaviorSubject<string>(this.channels[0].id);

  public get currentUser(): string {
    return this.currentUser$.value;
  }

  public get currentChatId(): string {
    return this.currentChatId$.value;
  }
}