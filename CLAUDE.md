# IF ELSE — site

Site estático em Hugo (extended), publicado no GitHub Pages via GitHub Actions.
O site fica na pasta `site/`; o design de referência fica em `design/` (local, fora do git).

## Regras
- Tema próprio em `site/themes/ifelse`. Não usar temas de terceiros.
- Cores vêm só de `site/assets/design/tokens.json` (cópia do export do Penpot; `design/` não é versionada), convertido em CSS variables por template Hugo
  (resources.ExecuteAsTemplate). Nunca hardcodar hex no CSS.
- Tema claro/escuro: papéis semânticos (`--bg`, `--ink`, …) mapeados para nomes de tokens em
  `themes/ifelse/data/theme.toml` e gerados como `light-dark()` em `assets/css/tokens.css`.
  No CSS, use os papéis, não `--color-*` direto (exceto na ilustração decorativa e no realce de código).
- Fontes self-hosted em `static/fonts` (GDPR). Proibido carregar fontes do Google CDN.
- CSS puro, mobile-first. Breakpoint principal: 390px (mobile) e 1440px (desktop).
- Sem JavaScript, salvo quando pedido explicitamente. Única exceção atual: o toggle de tema
  (`assets/js/theme.js`, inline via js.Build); sem JS o site segue `prefers-color-scheme`.
- Conteúdo dos posts em `content/journal/<slug>/index.md` (page bundles).
- Categorias = taxonomia `branches`: software-development, data-science, board-games, other-things.
- Textos do site em português brasileiro (idioma padrão, na raiz) e inglês (`/en/`). Sem alemão.
  Traduções por nome de arquivo (`index.md` = pt-br, `index.en.md` = en); strings de UI em `themes/ifelse/i18n/`.

## Comandos
Hugo roda via Docker (`compose.yaml`, imagem `ghcr.io/gohugoio/hugo`, versão fixada igual ao
workflow `.github/workflows/hugo.yml`).
- Dev: `docker compose up` → http://localhost:1313 (equivale a `hugo server -D --source site`)
- Build: `docker compose run --rm hugo --source site --minify`
- Novo post: `docker compose run --rm hugo new content journal/<slug> --source site`
- Tokens: `site/assets/design/tokens.json` vira CSS em `themes/ifelse/assets/css/tokens.css`.
  Ao reexportar do Penpot, copie o novo `tokens.json` para lá.