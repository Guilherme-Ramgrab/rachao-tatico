import { defaultPositions } from '../lib/formation';
import type { Board, Pitch, Player, Side, Team } from '../types';

export const MIN_PLAYERS = 1;
export const MAX_PLAYERS = 25;

const STORAGE_KEY = 'rachao-tatico:board:v1';

const DEFAULT_COUNT: Record<Pitch, number> = { campo: 11, futsal: 5 };

const DEFAULT_TEAMS: [Omit<Team, 'players'>, Omit<Team, 'players'>] = [
  { name: 'Time A', color: '#1f6fe0', gkColor: '#facc15' },
  { name: 'Time B', color: '#e0312b', gkColor: '#1f2937' },
];

export type Action =
  | { type: 'setPitch'; pitch: Pitch }
  | { type: 'setTeamCount'; side: Side; count: number }
  | { type: 'movePlayer'; side: Side; id: string; x: number; y: number }
  | { type: 'renamePlayer'; side: Side; id: string; name: string }
  | { type: 'setTeamName'; side: Side; name: string }
  | { type: 'setTeamColor'; side: Side; color: string }
  | { type: 'setGkColor'; side: Side; color: string }
  | { type: 'reset' };

const newId = () => Math.random().toString(36).slice(2, 10);

export const clampCount = (n: number) =>
  Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, Math.round(n)));

function makePlayers(count: number, side: Side): Player[] {
  return defaultPositions(count, side).map((p, i) => ({
    id: newId(),
    number: i + 1,
    name: '',
    ...p,
  }));
}

/** Ajusta a quantidade preservando nome e posição dos jogadores existentes. */
function resizePlayers(players: Player[], count: number, side: Side): Player[] {
  if (count <= players.length) return players.slice(0, count);
  const positions = defaultPositions(count, side);
  const added = positions.slice(players.length).map((p, i) => ({
    id: newId(),
    number: players.length + i + 1,
    name: '',
    ...p,
  }));
  return [...players, ...added];
}

export function createBoard(pitch: Pitch = 'campo'): Board {
  const count = DEFAULT_COUNT[pitch];
  return {
    pitch,
    teams: [
      { ...DEFAULT_TEAMS[0], players: makePlayers(count, 0) },
      { ...DEFAULT_TEAMS[1], players: makePlayers(count, 1) },
    ],
  };
}

function updateTeam(state: Board, side: Side, fn: (team: Team) => Team): Board {
  const teams = [...state.teams] as Board['teams'];
  teams[side] = fn(teams[side]);
  return { ...state, teams };
}

function updatePlayer(team: Team, id: string, patch: Partial<Player>): Team {
  return {
    ...team,
    players: team.players.map((p) => (p.id === id ? { ...p, ...patch } : p)),
  };
}

export function boardReducer(state: Board, action: Action): Board {
  switch (action.type) {
    case 'setPitch':
      return { ...state, pitch: action.pitch };
    case 'setTeamCount':
      return updateTeam(state, action.side, (t) => ({
        ...t,
        players: resizePlayers(t.players, clampCount(action.count), action.side),
      }));
    case 'movePlayer':
      return updateTeam(state, action.side, (t) =>
        updatePlayer(t, action.id, { x: action.x, y: action.y }),
      );
    case 'renamePlayer':
      return updateTeam(state, action.side, (t) =>
        updatePlayer(t, action.id, { name: action.name }),
      );
    case 'setTeamName':
      return updateTeam(state, action.side, (t) => ({ ...t, name: action.name }));
    case 'setTeamColor':
      return updateTeam(state, action.side, (t) => ({ ...t, color: action.color }));
    case 'setGkColor':
      return updateTeam(state, action.side, (t) => ({ ...t, gkColor: action.color }));
    case 'reset':
      return createBoard(state.pitch);
  }
}

function isBoard(value: unknown): value is Board {
  const b = value as Board;
  return (
    !!b &&
    (b.pitch === 'campo' || b.pitch === 'futsal') &&
    Array.isArray(b.teams) &&
    b.teams.length === 2 &&
    b.teams.every(
      (t) =>
        typeof t.name === 'string' &&
        typeof t.color === 'string' &&
        typeof t.gkColor === 'string' &&
        Array.isArray(t.players),
    )
  );
}

export function loadBoard(): Board {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isBoard(parsed)) return parsed;
    }
  } catch {
    // localStorage indisponível ou dado corrompido: começa do zero.
  }
  return createBoard();
}

export function saveBoard(board: Board) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch {
    // Sem armazenamento (aba anônima, cota cheia): segue sem salvar.
  }
}
