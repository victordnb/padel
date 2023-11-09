// app.component.ts
import { Component } from '@angular/core';
import { SharedService } from './shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public sharedService: SharedService) { }
  

  onSubmit() {
    this.sharedService.submit()
  .subscribe(response => {
    if (response !== null) {
      console.log(response);
    }
  });
  
    // Elimina el foco de cada campo de entrada
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

  // app.component.ts
  onEnter(event: any) {
  // Llama a la función submit que ya tienes
  this.sharedService.submit()
  .subscribe(response => {
    if (response !== null) {
      console.log(response);
    }
  });

  // Elimina el foco del campo de entrada
  (event.target as HTMLInputElement).blur();
  }

  // Función para mezclar un array
  shuffleArray(array: string[]): string[] {
    console.warn("se esta usando el Shuffle del app.component.ts");
    ('array');
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('array', array);
    return array;
  }
}