import { useRef, useState, type Dispatch, type PointerEvent, type RefObject } from 'react';
import type { Action } from '../state/boardReducer';
import type { Player, Side } from '../types';
import { Shirt } from './Shirt';

type Props = {
  player: Player;
  side: Side;
  color: string;
  /** Campo girado: o x do modelo vira o eixo vertical (Time A embaixo). */
  vertical: boolean;
  boardRef: RefObject<HTMLDivElement>;
  dispatch: Dispatch<Action>;
};

const clamp = (v: number) => Math.min(98, Math.max(2, v));

export function PlayerToken({ player, side, color, vertical, boardRef, dispatch }: Props) {
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing] = useState(false);
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x: player.x, y: player.y };
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    const board = boardRef.current;
    if (!start || !board) return;
    const rect = board.getBoundingClientRect();
    const dLeft = ((e.clientX - start.px) / rect.width) * 100;
    const dTop = ((e.clientY - start.py) / rect.height) * 100;
    dispatch({
      type: 'movePlayer',
      side,
      id: player.id,
      x: clamp(start.x + (vertical ? -dTop : dLeft)),
      y: clamp(start.y + (vertical ? dLeft : dTop)),
    });
  };

  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const placeholder = `Jogador ${player.number}`;

  return (
    <div
      className={`token${dragging ? ' is-dragging' : ''}`}
      style={
        vertical
          ? { left: `${player.y}%`, top: `${100 - player.x}%` }
          : { left: `${player.x}%`, top: `${player.y}%` }
      }
    >
      <div
        className="token-shirt"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        title="Arraste para mover"
      >
        <Shirt color={color} number={player.number} />
      </div>

      {editing ? (
        <input
          className="token-name token-input"
          autoFocus
          defaultValue={player.name}
          placeholder={placeholder}
          maxLength={24}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={(e) => {
            dispatch({ type: 'renamePlayer', side, id: player.id, name: e.currentTarget.value.trim() });
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
            if (e.key === 'Escape') setEditing(false);
          }}
        />
      ) : (
        <button
          type="button"
          className={`token-name${player.name ? '' : ' is-placeholder'}`}
          onClick={() => setEditing(true)}
          title="Clique para editar o nome"
          aria-label={`${player.name || placeholder} (editar nome)`}
        >
          {player.name || placeholder}
        </button>
      )}
    </div>
  );
}
