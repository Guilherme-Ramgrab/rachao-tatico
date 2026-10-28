import type { Pitch } from '../types';

type Props = {
  pitch: Pitch;
  exporting: boolean;
  onPitchChange: (pitch: Pitch) => void;
  onExport: () => void;
  onReset: () => void;
};

const PITCHES: { value: Pitch; label: string }[] = [
  { value: 'campo', label: 'Campo' },
  { value: 'futsal', label: 'Futsal' },
];

export function Toolbar({ pitch, exporting, onPitchChange, onExport, onReset }: Props) {
  return (
    <div className="toolbar">
      <div className="segmented" role="radiogroup" aria-label="Tipo de quadra">
        {PITCHES.map((p) => (
          <button
            key={p.value}
            type="button"
            role="radio"
            aria-checked={pitch === p.value}
            className={pitch === p.value ? 'is-active' : ''}
            onClick={() => onPitchChange(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <button type="button" className="btn btn-primary" onClick={onExport} disabled={exporting}>
        {exporting ? 'Gerando…' : 'Baixar imagem'}
      </button>
      <button type="button" className="btn" onClick={onReset}>
        Resetar
      </button>
    </div>
  );
}
