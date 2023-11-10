
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-multipista',
  templateUrl: './multipista.component.html',
  styleUrls: ['./multipista.component.css']
})
export class MultipistaComponent implements OnInit {
  appComponent: AppComponent;
  
  constructor(private sharedService: SharedService) { 
    this.appComponent = new AppComponent(sharedService);
  }

  ngOnInit(): void {
    // Aquí puedes poner cualquier código de inicialización que necesites.
  }
}

