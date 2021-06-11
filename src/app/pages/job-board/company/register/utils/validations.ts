import { AbstractControl,ValidationErrors } from "@angular/forms";
import { map } from "rxjs/operators";
import { JobBoardHttpService } from "src/app/services/job-board/job-board-http.service";

export class Validations{

    static validateIdentification(jobBoardHttpService:JobBoardHttpService) {
        return(control: AbstractControl)=>{
            const value = control.value;
            return jobBoardHttpService.verifyIdentification(value)
            .pipe(
                map(
                    response=>{
                        return response['data']?{notAvaibleUser:true}:null;
                    }
                )
            )

        }
        
    }

    static identificationMatchValidator(control: AbstractControl): ValidationErrors | null {
        const username: string = control.get('username').value; 
        const identification: string = control.get('identification').value; 
        // compare is the username math
        if (identification !== username) {
            // if they don't match, set an error in our confirmIdentification form control
            control.get('identification')?.setErrors({noIdentificationMatch: true});
            return ({noIdentificationMatch: true});
        }
        return null;
    }
}
