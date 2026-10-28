import { useEffect, useReducer, useRef, useState } from 'react';
import { Board } from './components/Board';
import { TeamPanel } from './components/TeamPanel';
import { Toolbar } from './components/Toolbar';
import { downloadAsPng } from './lib/exportImage';
import { boardReducer, loadBoard, saveBoard } from './state/boardReducer';

export default function App() {
  const [board, dispatch] = useReducer(boardReducer, undefined, loadBoard);
  const [exporting, setExporting] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Salva com um pequeno atraso para não gravar a cada pixel arrastado.
  useEffect(() => {
    const t = window.setTimeout(() => saveBoard(board), 250);
    return () => window.clearTimeout(t);
  }, [board]);

  const handleExport = async () => {
    if (!boardRef.current) return;
    setExporting(true);
    try {
      await downloadAsPng(boardRef.current);
    } catch (err) {
      console.error(err);
      alert('Não foi possível gerar a imagem. Tente novamente.');
    } finally {
      setExporting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Resetar os dois times? Nomes e posições serão apagados.')) {
      dispatch({ type: 'reset' });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>
          Rachão <span>Tático</span>
        </h1>
        <Toolbar
          pitch={board.pitch}
          exporting={exporting}
          onPitchChange={(pitch) => dispatch({ type: 'setPitch', pitch })}
          onExport={handleExport}
          onReset={handleReset}
        />
      </header>

      <main>
        <Board board={board} boardRef={boardRef} dispatch={dispatch} />
        <p className="hint">Arraste as camisas para posicionar. Toque no nome para editar.</p>

        <div className="panels">
          <TeamPanel team={board.teams[0]} side={0} dispatch={dispatch} />
          <TeamPanel team={board.teams[1]} side={1} dispatch={dispatch} />
        </div>
      </main>
    </div>
  );
}
