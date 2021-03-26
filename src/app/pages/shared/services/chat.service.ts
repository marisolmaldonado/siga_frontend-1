import {Injectable} from '@angular/core';
import {User} from "../models/user";
import Echo from "laravel-echo";
import {environment} from "../../../../environments/environment";
import {Token} from "../../../models/auth/token";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as moment from "moment";
import {Message} from "../models/message";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    public users: User[];
    public selectedUser: User;
    public messages: Message[];

    constructor(private _httpClient: HttpClient) {
        this.users = [];
        this.messages = [];
        this.selectedUser = null;
    }

    getSockets(): Echo {
        return new Echo({
            broadcaster: 'pusher',
            cluster: environment.PUSHER_CLUSTER,
            key: environment.PUSHER_KEY,
            wsHost: environment.PUSHER_HOST,
            wsPort: environment.PUSHER_PORT,
            forceTLS: false,
            disableStats: true,
            enabledTransports: ['ws'],
            authEndpoint: environment.PUSHER_URL,
            auth: {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${(JSON.parse(localStorage.getItem('token')) as Token).access_token}`,
                }
            }
        });
    }

    sendAllMessage(message: string, socketId) {
        const url = environment.API_URL_APP + 'chats/send_all';
        localStorage.setItem('socketID', socketId);
        return this._httpClient.post(url, {message});
    }

    sendDirectMessage(message: string, to: number, socketId) {
        const url = environment.API_URL_APP + 'chats/send_direct';
        localStorage.setItem('socketID', socketId);
        const data = {
            message,
            to
        }
        return this._httpClient.post(url, {data});
    }

    getDirectChat(auth:User) {
        this.getSockets().private(`channel-direct-chat.${auth.id}`).listen('DirectChatEvent', (response => {
            const msg = {
                message: response['response'].message,
                me: false,
                from: response['response'].from,
                created_at: moment().format('hh:mm:ss')
            };
            this.messages.push(msg);
        }));
    }

    generateHexadecimalColor() {
        let simbolos;
        let color;
        simbolos = "0123456789ABCDEF";
        color = "#";

        for (let i = 0; i < 6; i++) {
            color = color + simbolos[Math.floor(Math.random() * 16)];
        }
        return color;
    }


}
