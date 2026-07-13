#!/usr/bin/env bash
# validate-build.sh — Valida que el build de Tailwind compila sin errores
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

echo "═══ Validación Build Tailwind ═══"

if [ ! -d "node_modules" ]; then
  echo "⚠️  node_modules no encontrado. Ejecutando npm install..."
  npm install
fi

echo "→ Compilando CSS..."
npm run build:css

if [ ! -f "dist/output.css" ]; then
  echo "❌ dist/output.css no generado"
  exit 1
fi

SIZE=$(wc -c < dist/output.css | tr -d ' ')
LINES=$(wc -l < dist/output.css | tr -d ' ')

echo "✅ dist/output.css generado"
echo "   Tamaño: ${SIZE} bytes"
echo "   Líneas: ${LINES}"

if [ "$SIZE" -lt 100 ]; then
  echo "❌ Archivo CSS demasiado pequeño — posible error de build"
  exit 1
fi

echo "✅ Build validado"
