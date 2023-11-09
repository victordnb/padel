import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  saveStatus: 'initial' | 'saving' | 'success' | 'error' = 'initial';
  isFirstClick = true;
  inputs: string[] = ['', '', '', ''];
  pairs: string[][] = [];
  data: any = {};
  constructor(private http: HttpClient) { }

  isSubmitted = false;

  submit() {
    this.saveStatus = 'saving';
    this.pairs = [];
    let shuffledInputs = this.shuffleArray(this.inputs);
    console.log('shuffledInputs', shuffledInputs);
    
    for (let i = 1; i < shuffledInputs.length; i += 2) {
      this.pairs.push([shuffledInputs[i], shuffledInputs[i - 1]]);
    }
    this.isSubmitted = true;
    console.error(this.pairs);

    this.data.pairs = this.pairs;
    console.log('data', this.data);
    return this.http.post('http://localhost:3000/api/players', this.data).pipe(
      tap(() => {
        this.saveStatus = 'success';
      }),
      catchError(error => {
        console.error('Error:', error);
        this.saveStatus = 'error';
        return of(null);
      })
    );
  }
reset() {
  this.inputs = ['', '', '', ''];
  this.pairs = [];
  this.isSubmitted = false;
}


  private shuffleArray(array: any[]) {
    console.warn("se esta usando el Shuffle del shared.service.ts");  

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  
}