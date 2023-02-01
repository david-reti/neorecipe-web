import { ValidatorFn } from "@angular/forms";

export default function DateValidator() : ValidatorFn {
    return control => {
        if(control.value && isNaN(Date.parse(control.value))) {
            return {'invalidDate': true}
        }
        return null;
    }
}