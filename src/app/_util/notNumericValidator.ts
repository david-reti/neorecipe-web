import { ValidatorFn } from "@angular/forms";

export default function ValidateNotNumeric() : ValidatorFn {
    return control => {
        if(!isNaN(parseInt(control.value))) {
            return {'numeric': true};
        }
        return null;
    }
}