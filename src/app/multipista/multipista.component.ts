import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-multipista',
  templateUrl: './multipista.component.html',
  styleUrls: ['./multipista.component.css']
})
export class MultipistaComponent implements OnInit {
  appComponent = new AppComponent();

  ngOnInit(): void {
    
    // Aquí puedes poner cualquier código de inicialización que necesites.
  }
}