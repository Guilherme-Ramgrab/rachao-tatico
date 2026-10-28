import { PitchSvg, type ViewBox } from './PitchSvg';

/** Campo oficial 105 × 68 m, com 3 m de margem em volta. */
export const FIELD_VIEWBOX: ViewBox = { x: -3, y: -3, w: 111, h: 74 };

const STRIPES = 14;

export function FieldMarkings({ vertical }: { vertical: boolean }) {
  const { x, y, w, h } = FIELD_VIEWBOX;
  const stripeW = w / STRIPES;

  return (
    <PitchSvg viewBox={FIELD_VIEWBOX} vertical={vertical}>
      {Array.from({ length: STRIPES }, (_, i) => (
        <rect
          key={i}
          x={x + i * stripeW}
          y={y}
          width={stripeW + 0.05}
          height={h}
          fill={i % 2 ? '#2e9e57' : '#33ab5f'}
        />
      ))}

      <g fill="none" stroke="#fff" strokeWidth={0.45} strokeOpacity={0.95}>
        <rect x={0} y={0} width={105} height={68} />
        <line x1={52.5} y1={0} x2={52.5} y2={68} />
        <circle cx={52.5} cy={34} r={9.15} />

        {/* Áreas grandes, pequenas e meia-lua */}
        <rect x={0} y={13.84} width={16.5} height={40.32} />
        <rect x={88.5} y={13.84} width={16.5} height={40.32} />
        <rect x={0} y={24.84} width={5.5} height={18.32} />
        <rect x={99.5} y={24.84} width={5.5} height={18.32} />
        <path d="M16.5 26.69 A9.15 9.15 0 0 1 16.5 41.31" />
        <path d="M88.5 26.69 A9.15 9.15 0 0 0 88.5 41.31" />

        {/* Escanteios */}
        <path d="M0 1 A1 1 0 0 0 1 0" />
        <path d="M104 0 A1 1 0 0 0 105 1" />
        <path d="M0 67 A1 1 0 0 1 1 68" />
        <path d="M104 68 A1 1 0 0 1 105 67" />

        {/* Gols */}
        <rect x={-2} y={30.34} width={2} height={7.32} />
        <rect x={105} y={30.34} width={2} height={7.32} />
      </g>

      <g fill="#fff">
        <circle cx={52.5} cy={34} r={0.5} />
        <circle cx={11} cy={34} r={0.4} />
        <circle cx={94} cy={34} r={0.4} />
      </g>
    </PitchSvg>
  );
}
