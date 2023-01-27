import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class NeorecipeTitleStrategy extends TitleStrategy {
    constructor(private readonly title: Title) { super(); }
    updateTitle(snapshot: RouterStateSnapshot) {
        const title = this.buildTitle(snapshot);
        if(title !== undefined) {
        this.title.setTitle(`Neorecipe | ${title}`);
        }
    }
}