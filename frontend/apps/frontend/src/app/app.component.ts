import { Component } from '@angular/core';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  myFunc() {
    let clickCount = 0;

    console.log(clickCount);
  }

  myFuncB(abc) {
    if (abc === 1) {
      console.log(abc);
    } else {
    }
  }
}
