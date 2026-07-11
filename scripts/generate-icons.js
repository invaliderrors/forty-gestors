/**
 * Genera los íconos de la app: símbolo Fortu sobre fondo blanco con los
 * gradientes de marca (dorado arriba-derecha, cyan abajo-izquierda) — la
 * variante clara de Fortu Gestor (fortu-app usa fondo azul).
 *
 * Uso: node scripts/generate-icons.js
 * Salidas en assets/images/: icon.png, android-icon-{background,foreground,monochrome}.png, favicon.png
 */
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
const SYMBOL_PATH = path.join(IMAGES_DIR, 'Logo_Simbolo.png');
const CANVAS = 1024;

const symbolBase64 = fs.readFileSync(SYMBOL_PATH).toString('base64');
const symbolHref = `data:image/png;base64,${symbolBase64}`;
const SYMBOL_RATIO = 155 / 206; // ancho / alto del PNG fuente

const GRADIENT_DEFS = `
  <radialGradient id="gold" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#FFE9A8" stop-opacity="0.95"/>
    <stop offset="70%" stop-color="#FFE9A8" stop-opacity="0.38"/>
    <stop offset="100%" stop-color="#FFE9A8" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="cyan" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#C9EDFB" stop-opacity="0.95"/>
    <stop offset="70%" stop-color="#C9EDFB" stop-opacity="0.38"/>
    <stop offset="100%" stop-color="#C9EDFB" stop-opacity="0"/>
  </radialGradient>`;

const BACKGROUND_LAYERS = `
  <rect width="${CANVAS}" height="${CANVAS}" fill="#FFFFFF"/>
  <circle cx="880" cy="130" r="520" fill="url(#gold)"/>
  <circle cx="140" cy="900" r="580" fill="url(#cyan)"/>`;

function symbolImage(height, forceWhite = false) {
  const width = Math.round(height * SYMBOL_RATIO);
  const x = Math.round((CANVAS - width) / 2);
  const y = Math.round((CANVAS - height) / 2);
  const filterAttr = forceWhite ? ' filter="url(#toWhite)"' : '';
  return `<image href="${symbolHref}" x="${x}" y="${y}" width="${width}" height="${height}"${filterAttr}/>`;
}

function renderPng(svg, outputName, width = CANVAS) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(IMAGES_DIR, outputName), png);
  console.log(`✔ ${outputName} (${width}px)`);
}

const mainIconSvg = `<svg width="${CANVAS}" height="${CANVAS}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>${GRADIENT_DEFS}</defs>
  ${BACKGROUND_LAYERS}
  ${symbolImage(500)}
</svg>`;

const backgroundSvg = `<svg width="${CANVAS}" height="${CANVAS}" xmlns="http://www.w3.org/2000/svg">
  <defs>${GRADIENT_DEFS}</defs>
  ${BACKGROUND_LAYERS}
</svg>`;

// Zona segura del ícono adaptativo: el contenido debe caber en el 66% central.
const foregroundSvg = `<svg width="${CANVAS}" height="${CANVAS}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  ${symbolImage(400)}
</svg>`;

const monochromeSvg = `<svg width="${CANVAS}" height="${CANVAS}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="toWhite">
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/>
    </filter>
  </defs>
  ${symbolImage(400, true)}
</svg>`;

renderPng(mainIconSvg, 'icon.png');
renderPng(backgroundSvg, 'android-icon-background.png');
renderPng(foregroundSvg, 'android-icon-foreground.png');
renderPng(monochromeSvg, 'android-icon-monochrome.png');
renderPng(mainIconSvg, 'favicon.png', 196);
