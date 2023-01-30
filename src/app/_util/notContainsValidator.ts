import { ValidatorFn } from "@angular/forms";

export default function NotContainsValidator(field: string, contains: string) : ValidatorFn {
    return control => {
        if(control.get(field)?.value.includes(control.get(contains)?.value)) {
            return {'contains': true};
        }
        return null;
    }
}