export type Pitch = 'campo' | 'futsal';

export type Side = 0 | 1;

export type Player = {
  id: string;
  number: number;
  name: string;
  /** Posição horizontal em % da largura do tabuleiro (0–100). */
  x: number;
  /** Posição vertical em % da altura do tabuleiro (0–100). */
  y: number;
};

export type Team = {
  name: string;
  color: string;
  gkColor: string;
  players: Player[];
};

export type Board = {
  pitch: Pitch;
  teams: [Team, Team];
};
