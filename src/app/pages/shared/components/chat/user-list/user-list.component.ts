import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ChatService} from "../../../services/chat.service";
import Echo from "laravel-echo";
import {FormControl, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {environment} from "../../../../../../environments/environment";
import {element} from "protractor";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    echo: Echo;
    message: FormControl;
    selectedUser: User[];
    auth: User;
    STORAGE_URL: string = environment.STORAGE_URL;
    flagIconInputUserSearch: string;
    userSearch: FormControl;

    constructor(public chatService: ChatService) {
        this.auth = JSON.parse(localStorage.getItem('user'))
        this.message = new FormControl('', Validators.required);
        this.echo = this.chatService.getSockets();
        this.flagIconInputUserSearch = 'standby';
        this.userSearch = new FormControl('', Validators.required);
    }


    ngOnInit(): void {
        this.userSearch.valueChanges.subscribe(response => {
            if (response) {
                this.flagIconInputUserSearch = 'searching';
            } else {
                this.flagIconInputUserSearch = 'standby';
            }
        });
        this.chatService.getDirectChat(this.auth);
    }

    selectUser() {
        console.log(this.selectedUser[0]);
        if (this.selectedUser[0]?.id != this.auth.id) {
            this.chatService.selectedUser = this.selectedUser[0];
        }
    }

    sendDirectMessage() {
        this.chatService.sendDirectMessage(this.message.value, this.selectedUser[0]?.id, this.echo.socketId()).subscribe(response => {
            console.log(response);
        });
    }



}

