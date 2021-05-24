import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../../../../models/job-board/course';
import {MessageService} from '../../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss']
})

export class CourseFormComponent implements OnInit {
    @Input() formCourseIn: FormGroup;
    @Input() coursesIn: Course[];
    @Output() coursesOut = new EventEmitter<Course[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredTypes: any[];
    types: Catalogue[];

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getTypes();
    }

    // Fields of Form
    get idField() {
        return this.formCourseIn.get('id');
    }

    get idProfessional() {
        return this.formCourseIn.get('id');
    }

    get type() {
        return this.formCourseIn.get('type');
    }

    get institutionField() {
        return this.formCourseIn.get('institution');
    }

    get certificationTypeField() {
        return this.formCourseIn.get('certification_type');
    }

    get areaField() {
        return this.formCourseIn.get('area');
    }

    get nameField() {
        return this.formCourseIn.get('name');
    }

    get descriptionField() {
        return this.formCourseIn.get('description');
    }

    // Submit Form
    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formCourseIn.valid) {
            if (this.idField.value) {
                this.updateCourse(this.formCourseIn.value);
            } else {
                this.storeCourse(this.formCourseIn.value, flag);
            }
        } else {
            this.formCourseIn.markAllAsTouched();
        }
    }

    // Types of catalogues
    getTypes() {
        const params = new HttpParams().append('type', 'COURSE_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.types = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeCourse(course: Course, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('courses', {course}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveCourse(response['data']);
            if (flag) {
                this.formCourseIn.reset();
            } else {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateCourse(course: Course) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('courses/' + course.id, {course})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveCourse(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveCourse(course: Course) {
        const index = this.coursesIn.findIndex(element => element.id === course.id);
        if (index === -1) {
            this.coursesIn.push(course);
        } else {
            this.coursesIn[index] = course;
        }
        this.coursesOut.emit(this.coursesIn);
    }

    // Filter type of courses
    filterType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.types) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredTypes = filtered;
    }
}
