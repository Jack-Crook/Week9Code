import { RenderMode, ServerRoute } from '@angular/ssr';

// Tells Angular to build every page in the browser (Client) instead of on the server.
// Our pages load data from the Express API, so they need to run in the browser.
export const serverRoutes: ServerRoute[] = [
  { path: 'update/:id', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client }, // ** means every other path
];
