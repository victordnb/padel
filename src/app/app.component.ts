// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputs: string[] = ['', '', '', ''];
  pairs: string[][] = [];

  submit() {
    this.pairs = [];
    let indices = [0, 1, 2, 3];

    // Empareja los inputs dos a dos aleatoriamente
    while (indices.length > 0) {
      let randomIndex1 = Math.floor(Math.random() * indices.length);
      let index1 = indices[randomIndex1];
      indices.splice(randomIndex1, 1);

      let randomIndex2 = Math.floor(Math.random() * indices.length);
      let index2 = indices[randomIndex2];
      indices.splice(randomIndex2, 1);

      this.pairs.push([this.inputs[index1], this.inputs[index2]]);
    }

    console.log(this.pairs);
  }
}