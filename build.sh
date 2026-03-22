#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "=== Building English ==="
(cd en && mdbook build)

echo ""
echo "=== Building Turkish ==="
(cd tr && mdbook build)

echo ""
echo "✓ Both editions built → book/en  book/tr"
