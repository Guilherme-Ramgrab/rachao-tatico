type Props = {
  color: string;
  number: number;
};

/** Cor do número (branco ou quase preto) conforme o brilho da camisa. */
function numberColor(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return '#fff';
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? '#111827' : '#fff';
}

export function Shirt({ color, number }: Props) {
  const fg = numberColor(color);

  return (
    <svg className="shirt" viewBox="0 0 64 60" aria-hidden="true">
      <path
        d="M22 4 L8 12 L2 26 L12 30 L14 25 L14 56 L50 56 L50 25 L52 30 L62 26 L56 12 L42 4 Q32 12 22 4 Z"
        fill={color}
        stroke="#0b1b2e"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <text
        x={32}
        y={42}
        textAnchor="middle"
        fontSize={number > 9 ? 22 : 26}
        fontWeight={800}
        fill={fg}
        stroke={fg === '#fff' ? '#0b1b2e' : 'none'}
        strokeWidth={1.2}
        paintOrder="stroke"
        fontFamily="system-ui, sans-serif"
      >
        {number}
      </text>
    </svg>
  );
}
