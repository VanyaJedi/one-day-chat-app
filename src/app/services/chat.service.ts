import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { from, map, Observable } from "rxjs";
import { Message } from "../models";
import { ChatStateService } from "./chat-state.serivice";
import { FETCH_LATEST_MESSAGES, FETCH_MORE_MESSAGES } from "../api/queries";
import { POST_MESSAGE } from "../api";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private apollo: Apollo, private readonly chatStateService: ChatStateService) {}


  public getLatestMessages(): Observable<{ fetchLatestMessages: Message[] }> {
    const channelId = this.chatStateService.currentChatId;
    return from(this.apollo.query<{ fetchLatestMessages: Message[] }, { channelId: string; }>({
      query: FETCH_LATEST_MESSAGES,
      variables: {
        channelId
      },
      fetchPolicy: 'network-only'
    })).pipe(
      map((result) => result.data)
    );
  }

  public sendMessage(text: string): Observable<{ postMessage: Message} | null | undefined> {
    const channelId = this.chatStateService.currentChatId;
    const userId = this.chatStateService.currentUser;

    return this.apollo.mutate<{ postMessage: Message}>({
      mutation: POST_MESSAGE,
      variables: { channelId, text, userId }
    }).pipe(
      map((result) => result.data),
    )
  }

  public fetchMoreMessages(messageId: string, old: boolean): Observable<{ fetchMoreMessages: Message[] }> {
    const channelId = this.chatStateService.currentChatId;
    return this.apollo.query<{ fetchMoreMessages: Message[] }, { channelId: string; messageId: string; old: boolean }>({
      query: FETCH_MORE_MESSAGES,
      variables: {
        channelId,
        messageId,
        old
      }
    }).pipe(
      map((result) => result.data)
    );;
  }

  public makeTempMessage(userId: string, text: string, status: string): Message {
    return {
      userId,
      text,
      status,
      messageId: '',
      datetime: new Date().toISOString(),
    }
  }

}