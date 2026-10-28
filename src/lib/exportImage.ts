import { toPng } from 'html-to-image';

export async function downloadAsPng(node: HTMLElement, fileName = 'rachao-tatico.png') {
  const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
