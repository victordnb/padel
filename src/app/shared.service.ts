import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Liga } from './interface/liga'; 


import { Observable } from 'rxjs';

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
    const data = {
      array1: this.pairs[0],
      array2: this.pairs[1]
    };
  
    console.log('data', data);


    //local:
    //return this.http.post('http://localhost:3000/api/players', data).pipe(
    //online: 
    //return this.http.post('https://padelback20.onrender.com/api/players', data).pipe(

    return this.http.post('https://padelback20.onrender.com/api/players', data).pipe(
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

  getSomeData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get('http://localhost:3000/api/some-data', { headers });
  }

  getDatesWithData(): Observable<Date[]> {
    return this.http.get<Date[]>(`https://padelback20.onrender.com/api/players/datesWithData`);
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

  getMatchedPlayers(date: string) {
    console.log('date getMatchedPlayers shared..', date);
    return this.http.get(`https://padelback20.onrender.com/api/players/matches?date=${date}`).pipe(
      tap(data => console.log(data)),
      catchError(error => {
        console.error('Error:', error);
        return of(null);
      })
    );
  }

  register(formData: any) {
    console.log('formData', formData);
    //return this.http.post('https://padelback20.onrender.com/api/register', formData).pipe(
    return this.http.post('https://padelback20.onrender.com/api/register', formData).pipe(
      tap(() => {
        console.log('Registro exitoso');
      }),
      catchError(error => {
        console.error('Error (aun no esta impentado en el backend!):', error);
        return of(null);
      })
    );
  }

  login(user: { username: string, password: string }): Observable<any> {
    //local:
    //return this.http.post(`http://localhost:3000/api/login`, user, { responseType: 'json' }).pipe(  
      return this.http.post(`https://padelback20.onrender.com/api/login`, user, { responseType: 'json' }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.username);
      })
    );
  } 

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setTokenToUser(token: string){
    const user = localStorage.getItem('user');
  
    if (!user || !token) {
      console.error('User or token is missing');
      return;
    }
  
    const url = `https://padelback20.onrender.com/api/login/users/${user}`;
  

    return this.http.post(url, { token }).pipe(
      catchError(error => {
        console.error('Error in setTokenToUser:', error);
        return throwError(error);
      })
    );
  }

  obtenerNombresDeUsuario(): Observable<string[]> {
    return this.http.get<string[]>('https://padelback20.onrender.com/api/players/usernames')
    .pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  guardarLiga(liga: any): Observable<any> {
    return this.http.post('https://padelback20.onrender.com/api/players/liga', liga).pipe(
      tap(() => {
        console.log('Liga guardada con éxito');
      }),
      catchError(error => {
        console.error('Error al guardar la liga:', error);
        return throwError(error);
      })
    );
  }

  obtenerLigaPorNombre(nombre: string): Observable<Liga> {
    return this.http.get<Liga>(`https://padelback20.onrender.com/api/players/liga/${nombre}`);
  }

  obtenerLigasPorUsername(username: string): Observable<Liga[]> {
    let name = username;
    //quitarles las comillas:
    name = name.replace(/"/g, "");

    return this.http.get<Liga[]>(`https://padelback20.onrender.com/api/players/liga/usuario/${name}`);
  }
  

  editarPuntos(liga: Liga, participante: {username: string, points: number}): Observable<any> {
    console.log('liga: ', liga);
    console.log('participante: ', participante);
    const url = `https://padelback20.onrender.com/api/players/liga/${liga.nombre}`;
    return this.http.put(url, participante);
  }
  


}