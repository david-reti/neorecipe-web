import { ValidatorFn } from "@angular/forms";
import { Profanity, ProfanityOptions } from "@2toad/profanity";

export default function ValiateAgainstBadWords() : ValidatorFn {
    const options = new ProfanityOptions();
    options.wholeWord = false;
    const profanity = new Profanity(options);
    return control => {
        if(profanity.exists(control.value)) {
            return {'profanity' : true}
        }
        return null;
    }
}