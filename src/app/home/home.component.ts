import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  ngAfterViewInit() {
    this.attemptPlay();
  }

  attemptPlay() {
    let video : HTMLVideoElement | null = document.querySelector("#background_video");
    if(video) {
      video.muted = true;
      video.play();
    }
  }
}
