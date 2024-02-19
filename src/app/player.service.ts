// player.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player = {
    name: 'Nombre',
    surname: 'Apellido',
    city: 'Ciudad',
    age: 25,
    level: 'Intermedio',
    matches: [
      { date: new Date(), players: ['Jugador 3', 'Jugador 4', 'jugador 23', 'jugador24'], result: ['6-2', '3-6', '7-5'] },
      { date: new Date(), players: ['Jugador 5', 'Jugador 6', 'jugador 25', 'jugador26'], result: ['6-2', '3-6', '7-5'] },
    ]
  }; //TODO: Cambiar por datos reales de la base de datos con petición al backend!!!!

  constructor() { }

  getPlayer() {
    return this.player;
  }
}