# Rachão Tático

Monte a escalação dos dois times do seu rachão: arraste as camisas pelo campo ou pela quadra de futsal, escreva o nome de cada jogador e baixe a imagem para compartilhar.

## Funcionalidades

- Dois times no mesmo campo, cada um com sua cor (e cor própria para o goleiro, camisa 1)
- Quantidade de jogadores livre por time (1 a 25)
- Arrastar com mouse ou toque
- Clique/toque no nome para editar
- Alternar entre campo e quadra de futsal
- Salva automaticamente no navegador
- Exportar o campo como PNG

## Rodando localmente

```bash
npm install
npm run dev
```

## Publicando na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. O framework **Vite** é detectado automaticamente (build `npm run build`, saída `dist`). Clique em **Deploy**.

Ou, pela linha de comando: `npx vercel`.
