import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/auth/user';
import {FormGroup} from '@angular/forms';
import {Col} from '../../../../models/setting/col';
import {Paginator} from '../../../../models/setting/paginator';
import {MessageService} from '../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserAdministrationService} from '../../../../services/auth/user-administration.service';
import {HttpParams} from '@angular/common/http';
import {File} from "../../../../models/app/file";

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill-list.component.html',
    styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
    @Input() flagUsers: boolean;
    @Input() usersIn: User[];
    @Input() paginatorIn: Paginator;
    @Input() formUserIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() usersOut = new EventEmitter<User[]>();
    @Output() formUserOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedUsers: any[];
    selectedUser: User;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    files: File[];
    paginatorFiles: Paginator;

    constructor(private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private userAdministrationService: UserAdministrationService) {
        this.resetPaginator();
    }

    resetPaginator() {
        this.paginatorFiles = {current_page: 1, per_page: 5, system: 1};
    }

    ngOnInit(): void {
    }

    // Search users in backend
    searchSkills(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.userAdministrationService.get('user-admins', params).subscribe(response => {
                this.usersIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    pageChange(event) {
        this.paginatorIn.current_page = event.page + 1;
        this.paginatorOut.emit(this.paginatorIn);
    }

}
