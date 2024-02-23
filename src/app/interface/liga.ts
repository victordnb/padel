export interface Liga {
  nombre: string;
  participantes: {
    username: string;
    points: number;
    editing?: boolean;
    editValue?: number;
  }[];
}