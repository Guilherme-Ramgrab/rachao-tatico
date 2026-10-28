import { useEffect, useState, type Dispatch } from 'react';
import { MAX_PLAYERS, MIN_PLAYERS, clampCount, type Action } from '../state/boardReducer';
import type { Side, Team } from '../types';

type Props = {
  team: Team;
  side: Side;
  dispatch: Dispatch<Action>;
};

export function TeamPanel({ team, side, dispatch }: Props) {
  const count = team.players.length;
  // Rascunho local para permitir digitação livre (ex.: apagar e redigitar).
  const [draft, setDraft] = useState(String(count));

  useEffect(() => setDraft(String(count)), [count]);

  const commitCount = (value: string) => {
    const n = Number(value);
    if (value.trim() === '' || !Number.isFinite(n)) {
      setDraft(String(count));
      return;
    }
    const clamped = clampCount(n);
    dispatch({ type: 'setTeamCount', side, count: clamped });
    setDraft(String(clamped));
  };

  return (
    <section className="panel" style={{ borderTopColor: team.color }}>
      <label className="field">
        <span>Nome do time</span>
        <input
          type="text"
          value={team.name}
          maxLength={24}
          onChange={(e) => dispatch({ type: 'setTeamName', side, name: e.target.value })}
        />
      </label>

      <label className="field">
        <span>Jogadores ({MIN_PLAYERS}–{MAX_PLAYERS})</span>
        <input
          type="number"
          inputMode="numeric"
          min={MIN_PLAYERS}
          max={MAX_PLAYERS}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = Number(e.target.value);
            if (e.target.value !== '' && Number.isInteger(n) && n >= MIN_PLAYERS && n <= MAX_PLAYERS) {
              dispatch({ type: 'setTeamCount', side, count: n });
            }
          }}
          onBlur={(e) => commitCount(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitCount(e.currentTarget.value);
          }}
        />
      </label>

      <div className="color-row">
        <label className="color-field">
          <input
            type="color"
            value={team.color}
            onChange={(e) => dispatch({ type: 'setTeamColor', side, color: e.target.value })}
          />
          <span>Camisa do time</span>
        </label>
        <label className="color-field">
          <input
            type="color"
            value={team.gkColor}
            onChange={(e) => dispatch({ type: 'setGkColor', side, color: e.target.value })}
          />
          <span>Goleiro</span>
        </label>
      </div>
    </section>
  );
}
