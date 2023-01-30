import { ValidatorFn } from "@angular/forms";

export default function NoSpecialCharacterValidator() : ValidatorFn {
    return control => {
        if(control.value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
            return {'nospecialcharacters': true}
        }
        return null;
    }
}