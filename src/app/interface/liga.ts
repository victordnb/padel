export interface Liga {
    nombre: string;
    participantes: {
      username: string;
      points: number;
    }[];
  }