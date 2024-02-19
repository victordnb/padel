import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-random-match',
  templateUrl: './random-match.component.html',
  styleUrls: ['./random-match.component.css']
})
export class RandomMatchComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.sharedService.submit()
      .subscribe(response => {
        if (response !== null) {
          console.log(response);
        }
      });

    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].blur();
    }
  }

  reset() {
    this.sharedService.inputs = ['', '', '', ''];
    this.sharedService.pairs = [];
    this.sharedService.isSubmitted = false;
  }

  onEnter(event: any) {
    this.sharedService.submit()
      .subscribe(response => {
        if (response !== null) {
          console.log(response);
        }
      });

    (event.target as HTMLInputElement).blur();
  }

  shuffleArray(array: string[]): string[] {
    console.warn("se esta usando el Shuffle del app.component.ts");
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('array', array);
    return array;
  }
}