import { ValidatorFn } from "@angular/forms";

export default function FieldMatchValidator(first: string, second: string) : ValidatorFn {
    return control => {
        if(control.get(first)?.value != control.get(second)?.value) {  return { 'noMatch': true} }
        return null;
    }
}