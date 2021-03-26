import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../models/message";
import {ChatService} from "../../../services/chat.service";

@Component({
    selector: 'app-chat-body',
    templateUrl: './chat-body.component.html',
    styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit {

    constructor(public chatService:ChatService) {

    }

    ngOnInit(): void {

    }

}
