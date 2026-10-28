import type { CSSProperties, Dispatch, RefObject } from 'react';
import { useMediaQuery } from '../lib/useMediaQuery';
import type { Action } from '../state/boardReducer';
import type { Board as BoardState, Side } from '../types';
import { FIELD_VIEWBOX, FieldMarkings } from './pitches/FieldMarkings';
import { FUTSAL_VIEWBOX, FutsalMarkings } from './pitches/FutsalMarkings';
import { PlayerToken } from './PlayerToken';

type Props = {
  board: BoardState;
  boardRef: RefObject<HTMLDivElement>;
  dispatch: Dispatch<Action>;
};

export function Board({ board, boardRef, dispatch }: Props) {
  // Em telas estreitas (celular em pé) o campo é desenhado na vertical.
  const vertical = useMediaQuery('(max-width: 640px)');
  const isField = board.pitch === 'campo';
  const vb = isField ? FIELD_VIEWBOX : FUTSAL_VIEWBOX;
  const aspect = vertical ? vb.h / vb.w : vb.w / vb.h;

  return (
    <div
      ref={boardRef}
      className={`board board--${board.pitch}${vertical ? ' board--vertical' : ''}`}
      style={{ aspectRatio: String(aspect), '--aspect': aspect } as CSSProperties}
    >
      {isField ? <FieldMarkings vertical={vertical} /> : <FutsalMarkings vertical={vertical} />}

      {board.teams.map((team, side) => (
        <div
          key={`label-${side}`}
          className={`team-label team-label--${side}`}
          style={{ '--team-color': team.color } as CSSProperties}
        >
          {team.name}
        </div>
      ))}

      {board.teams.map((team, side) =>
        team.players.map((player, i) => (
          <PlayerToken
            key={player.id}
            player={player}
            side={side as Side}
            color={i === 0 ? team.gkColor : team.color}
            vertical={vertical}
            boardRef={boardRef}
            dispatch={dispatch}
          />
        )),
      )}

      <div className="board-credit">rachao-tatico.vercel.app</div>
    </div>
  );
}
