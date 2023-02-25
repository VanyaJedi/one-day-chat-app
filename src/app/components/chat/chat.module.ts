import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { UserSelectControlModule } from "../user-select-control/user-select-control.module";
import { ChannelSelectControlModule } from "../channel-select-control/channel-select-control.module";
import { MessagesAreaModule } from "../messages-area/messages-area.module";
import { TypingAreaModule } from "../typing-area/typing-area.module";


@NgModule({
    declarations: [ChatComponent],
    exports: [ChatComponent],
    imports: [
        CommonModule,
        UserSelectControlModule,
        ChannelSelectControlModule,
        MessagesAreaModule,
        TypingAreaModule
    ]
})
export class ChatModule { }
