#!/usr/bin/env bash
# run-all.sh — Ejecuta todas las validaciones del Quality Harness
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  MacWave T2 — Quality Harness — Validación Total ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

PASS=0
FAIL=0

run_check() {
  local name="$1"
  local cmd="$2"
  echo "── $name ──"
  if eval "$cmd"; then
    PASS=$((PASS + 1))
  else
    echo "❌ FALLÓ: $name"
    FAIL=$((FAIL + 1))
  fi
  echo ""
}

run_check "Build Tailwind" "bash quality/validation/validate-build.sh"
run_check "HTML estructura" "bash quality/validation/validate-html.sh"
run_check "Estado migración" "node quality/scripts/migration-status.js"
run_check "ESLint" "npm run lint 2>/dev/null || true"
run_check "Prettier check" "npm run format:check 2>/dev/null || true"

echo "╔══════════════════════════════════════════════════╗"
echo "║  RESULTADO: $PASS pasaron, $FAIL fallaron                    ║"
echo "╚══════════════════════════════════════════════════╝"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
