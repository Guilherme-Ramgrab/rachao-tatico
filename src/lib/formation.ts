import type { Side } from '../types';

export type Point = { x: number; y: number };

/**
 * Gera posições padrão para `count` jogadores na metade do campo de um time.
 * Índice 0 é o goleiro; os demais são distribuídos em colunas (defesa → ataque).
 * Time 1 é espelhado para a metade direita.
 */
export function defaultPositions(count: number, side: Side): Point[] {
  const points: Point[] = [{ x: 7, y: 50 }];
  const outfield = count - 1;

  if (outfield > 0) {
    const cols = Math.min(4, Math.max(1, Math.ceil(outfield / 3.5)));
    const base = Math.floor(outfield / cols);
    const extra = outfield % cols;
    const colWidth = 28 / cols;

    for (let c = 0; c < cols; c++) {
      // Colunas de trás recebem os jogadores excedentes.
      const rows = base + (c < extra ? 1 : 0);
      const x = 17 + colWidth * (c + 0.5);
      for (let r = 0; r < rows; r++) {
        points.push({ x, y: 12 + (76 / rows) * (r + 0.5) });
      }
    }
  }

  return side === 0 ? points : points.map((p) => ({ x: 100 - p.x, y: p.y }));
}
