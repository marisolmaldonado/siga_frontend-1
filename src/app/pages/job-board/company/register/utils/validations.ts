import { AbstractControl } from "@angular/forms";

export class Validations{

    static confirmPasswordValidator(control: AbstractControl) {
        const password: string = control.get('password').value;
        const confirmPassword: string = control.get('password_confirmation').value; 
        if (password !== confirmPassword) {
            control.get('password_confirmation').setErrors({ invalidPassword: true });
        }
        return null
    }
}
