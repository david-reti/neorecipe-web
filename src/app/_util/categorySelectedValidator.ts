import { ValidatorFn } from "@angular/forms";


export default function CategorySelectedValidator() : ValidatorFn {
    return control => {
        if(control.value === 'Select Category') {
            return {'categorySelect': true}
        }
        return null;
    }
}