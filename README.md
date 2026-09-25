# Yale ResCo Menus

A single-page Yale residential-college lunch/dinner comparator.

## Deploy to Cloudflare Pages

This project uses a Pages Function at `/api/menu` to proxy Yale Hospitality's Nutrislice API, avoiding browser CORS restrictions.

Cloudflare's current Pages documentation says Functions projects should be deployed via Git integration or Wrangler (dashboard Direct Upload does not support Functions).

### GitHub route
1. Create a GitHub repository and put these files in it.
2. In Cloudflare: Workers & Pages → Create → Pages → Connect to Git.
3. Select the repository.
4. Build command: `exit 0`
5. Build output directory: `/` (project root).
6. Deploy.
7. Open the generated `*.pages.dev` address and bookmark it.

No API key or database is required.
