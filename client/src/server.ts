import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import compression from 'compression'; // Import compression
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

// Enable Gzip/Brotli compression for responses
app.use(compression());

/**
 * Serve static files from /browser with caching
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y', // Cache static assets for 1 year
    index: 'index.html'
  })
);

/**
 * Explicitly serve Service Worker and PWA assets
 */
app.get('/ngsw-worker.js', (req, res) => {
  res.sendFile(join(browserDistFolder, 'ngsw-worker.js'));
});

app.get('/ngsw.json', (req, res) => {
  res.sendFile(join(browserDistFolder, 'ngsw.json'));
});

app.get('/manifest.webmanifest', (req, res) => {
  res.sendFile(join(browserDistFolder, 'manifest.webmanifest'));
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
