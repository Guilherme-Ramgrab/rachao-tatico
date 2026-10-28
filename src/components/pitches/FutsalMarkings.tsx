import { PitchSvg, type ViewBox } from './PitchSvg';

/** Quadra de futsal 40 × 20 m, com 2 m de margem em volta. */
export const FUTSAL_VIEWBOX: ViewBox = { x: -2, y: -2, w: 44, h: 24 };

const PLANKS = 24;

export function FutsalMarkings({ vertical }: { vertical: boolean }) {
  const { x, y, w, h } = FUTSAL_VIEWBOX;
  const plankH = h / PLANKS;

  return (
    <PitchSvg viewBox={FUTSAL_VIEWBOX} vertical={vertical}>
      {/* Margem externa */}
      <rect x={x} y={y} width={w} height={h} fill="#2f5d8a" />

      {/* Piso de madeira */}
      <g>
        {Array.from({ length: PLANKS }, (_, i) => {
          const py = y + i * plankH;
          if (py + plankH <= 0 || py >= 20) return null;
          const top = Math.max(py, 0);
          const bottom = Math.min(py + plankH, 20);
          return (
            <rect
              key={i}
              x={0}
              y={top}
              width={40}
              height={bottom - top + 0.02}
              fill={i % 2 ? '#c98a4b' : '#d29453'}
            />
          );
        })}
      </g>

      {/* Áreas (preenchidas) */}
      <g fill="#b36f35" fillOpacity={0.55}>
        <path d="M0 2.5 A6 6 0 0 1 6 8.5 L6 11.5 A6 6 0 0 1 0 17.5 Z" />
        <path d="M40 2.5 A6 6 0 0 0 34 8.5 L34 11.5 A6 6 0 0 0 40 17.5 Z" />
      </g>

      <g fill="none" stroke="#fff" strokeWidth={0.16}>
        <rect x={0} y={0} width={40} height={20} />
        <line x1={20} y1={0} x2={20} y2={20} />
        <circle cx={20} cy={10} r={3} />
        <path d="M0 2.5 A6 6 0 0 1 6 8.5 L6 11.5 A6 6 0 0 1 0 17.5" />
        <path d="M40 2.5 A6 6 0 0 0 34 8.5 L34 11.5 A6 6 0 0 0 40 17.5" />

        {/* Escanteios */}
        <path d="M0 0.25 A0.25 0.25 0 0 0 0.25 0" />
        <path d="M39.75 0 A0.25 0.25 0 0 0 40 0.25" />
        <path d="M0 19.75 A0.25 0.25 0 0 1 0.25 20" />
        <path d="M39.75 20 A0.25 0.25 0 0 1 40 19.75" />

        {/* Gols */}
        <rect x={-1} y={8.5} width={1} height={3} />
        <rect x={40} y={8.5} width={1} height={3} />
      </g>

      <g fill="#fff">
        <circle cx={20} cy={10} r={0.2} />
        <circle cx={6} cy={10} r={0.15} />
        <circle cx={34} cy={10} r={0.15} />
        <circle cx={10} cy={10} r={0.15} />
        <circle cx={30} cy={10} r={0.15} />
      </g>
    </PitchSvg>
  );
}
