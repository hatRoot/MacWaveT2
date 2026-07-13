#!/usr/bin/env bash
# validate-html.sh — Verifica estructura HTML básica en páginas públicas
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

echo "═══ Validación HTML ═══"

ERRORS=0
PUBLIC_HTML=(
  index.html reparaciones.html empresas.html software.html casos-reales.html
  terminos.html upgrades.html
)

for file in "${PUBLIC_HTML[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ No encontrado: $file"
    ERRORS=$((ERRORS + 1))
    continue
  fi

  # DOCTYPE
  if ! head -1 "$file" | grep -qi "doctype html"; then
    echo "⚠️  $file: falta DOCTYPE"
    ERRORS=$((ERRORS + 1))
  fi

  # lang attribute (es o es-MX)
  if ! grep -qE 'lang="es' "$file"; then
    echo "⚠️  $file: falta lang=\"es\""
    ERRORS=$((ERRORS + 1))
  fi

  # viewport
  if ! grep -q 'name="viewport"' "$file"; then
    echo "⚠️  $file: falta viewport meta"
    ERRORS=$((ERRORS + 1))
  fi

  # CSS link
  if ! grep -q 'style.css\|dist/output.css' "$file"; then
    echo "⚠️  $file: sin referencia CSS"
    ERRORS=$((ERRORS + 1))
  fi

  # title
  if ! grep -q '<title>' "$file"; then
    echo "⚠️  $file: falta <title>"
    ERRORS=$((ERRORS + 1))
  fi

  echo "✅ $file"
done

if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "❌ $ERRORS advertencias/errores encontrados"
  exit 1
fi

echo ""
echo "✅ HTML validado (${#PUBLIC_HTML[@]} páginas)"
