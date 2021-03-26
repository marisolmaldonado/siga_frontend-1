import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Echo from "laravel-echo";
import {User} from "../../models/user";
import {ChatService} from "../../services/chat.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Message} from "../../models/message";
import * as moment from "moment";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    @ViewChild('inputMessage', null) inputMessage: ElementRef;
    echo: Echo;
    user: User;
    isJoin: boolean;
    message: FormControl;
    flagIconInputMessage: string;
    auth: User;

    constructor(private chatService: ChatService, private formBuilder: FormBuilder) {
        this.echo = chatService.getSockets();
        this.auth = JSON.parse(localStorage.getItem('user'))
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.isJoin = false;
        this.message = formBuilder.control('', Validators.required);
        this.flagIconInputMessage = 'standby';
    }

    ngOnInit(): void {
        this.echo.private('channel-chat')
            .listen('ChatEvent', (resp) => {
                // const msg = {message: resp.message, me: false, from: resp.from};
                // this.messages.push(msg);
                // console.log(this.messages);
            });

        this.echo.join(`channel-chat`)
            .here((users) => {
                console.log('join ');
                this.chatService.users = users;

                for (let i = 0; i < this.chatService.users?.length; i++) {
                    this.chatService.users[i].backgroundColorAvatar = this.chatService.generateHexadecimalColor();
                    this.chatService.users[i].colorAvatar = this.chatService.generateHexadecimalColor();
                }
            })
            .joining((user) => {
                console.log('joining ' + user);
                this.chatService.users.push(user);
            })
            .leaving((user) => {
                console.log('user ' + user);
                this.chatService.users = this.chatService.users.filter((userL) => {
                    return user.id !== userL.id;
                });
            });

        this.message.valueChanges.subscribe(response => {
            if (response) {
                this.flagIconInputMessage = 'writing';
            } else {
                this.flagIconInputMessage = 'standby';
            }
        })

    }

    leaveChat() {
        this.echo.leave('channel-chat');
        this.chatService.users = this.chatService.users.filter((userL) => {
            return this.user.id !== userL.id;
        });
        this.isJoin = true;
    }

    joinChat() {
        this.echo.join('channel-chat');
        this.chatService.users.push(this.user);
        console.log(this.chatService.users);
        this.isJoin = false;
    }

    sendMessage() {
        if (this.message.valid) {
            this.flagIconInputMessage = 'sending';
            this.chatService.sendAllMessage(this.message.value, this.echo.socketId()).subscribe(response => {
                const msg = {
                    message: this.message.value,
                    me: true,
                    from: 'Yo',
                    created_at: moment().format('hh:mm:ss')
                };
                this.chatService.messages.push(msg);
                this.message.reset();
                this.flagIconInputMessage = 'standby';
            })
        }
    }

    sendDirectMessage() {
        if (this.message.valid) {
            this.flagIconInputMessage = 'sending';
            this.chatService.sendDirectMessage(this.message.value, this.chatService.selectedUser?.id, this.echo.socketId()).subscribe(response => {
                const msg = {
                    message: this.message.value,
                    me: true,
                    from: 'Yo',
                    created_at: moment().format('hh:mm:ss')
                };
                this.chatService.messages.push(msg);
                this.message.reset();
                this.flagIconInputMessage = 'standby';
            });
        }
    }
}
