import type { ReactNode } from 'react';

export type ViewBox = { x: number; y: number; w: number; h: number };

type Props = {
  viewBox: ViewBox;
  vertical: boolean;
  children: ReactNode;
};

/**
 * Desenha as marcações na horizontal ou giradas 90° (anti-horário) para telas
 * em pé: o gol do Time A fica embaixo e o do Time B em cima.
 */
export function PitchSvg({ viewBox: { x, y, w, h }, vertical, children }: Props) {
  // rotate(-90) leva (x, y) para (y, -x), então o viewBox troca os eixos.
  const vb = vertical ? `${y} ${-(x + w)} ${h} ${w}` : `${x} ${y} ${w} ${h}`;

  return (
    <svg className="pitch-svg" viewBox={vb} preserveAspectRatio="none" aria-hidden="true">
      <g transform={vertical ? 'rotate(-90)' : undefined}>{children}</g>
    </svg>
  );
}
