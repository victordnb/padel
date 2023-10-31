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
    let shuffledInputs = this.shuffleArray(this.inputs);
    console.log('shuffledInputs', shuffledInputs);
    
    for (let i = 1; i < shuffledInputs.length; i += 2) {
      this.pairs.push([shuffledInputs[i], shuffledInputs[i - 1]]);
    }
  
    console.log(this.pairs);
  }

  onSubmit() {
    // Llama a la función submit que ya tienes
    this.submit();
  
    // Elimina el foco de cada campo de entrada
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].blur();
    }
  }

  // app.component.ts
onEnter(event: KeyboardEvent) {
  // Llama a la función submit que ya tienes
  this.submit();

  // Elimina el foco del campo de entrada
  (event.target as HTMLInputElement).blur();
}

  // Función para mezclar un array
  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('array', array);
    return array;
  }
}