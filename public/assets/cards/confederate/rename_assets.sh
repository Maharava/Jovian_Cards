#!/bin/bash

# Common cards (use tier1)
for card in himalia amalthea leda lysithea kore adrastea carpo; do
  if [ -f "${card}_tier1.png" ]; then
    cp "${card}_tier1.png" "${card}.png"
    rm -f "${card}_tier1.png" "${card}_tier2.png" "${card}_tier3.png"
    echo "✓ ${card}.png (from tier1)"
  fi
done

# Uncommon cards (use tier1)
for card in sinope euporie callisto taygete cyllene; do
  if [ -f "${card}_tier1.png" ]; then
    cp "${card}_tier1.png" "${card}.png"
    rm -f "${card}_tier1.png" "${card}_tier2.png" "${card}_tier3.png"
    echo "✓ ${card}.png (from tier1)"
  fi
done

# Rare cards (use tier2)
for card in elara io pasiphae praxidike ganymede; do
  if [ -f "${card}_tier2.png" ]; then
    cp "${card}_tier2.png" "${card}.png"
    rm -f "${card}_tier1.png" "${card}_tier2.png" "${card}_tier3.png"
    echo "✓ ${card}.png (from tier2)"
  fi
done

# Legendary cards (use tier3)
for card in europa metis thebe; do
  if [ -f "${card}_tier3.png" ]; then
    cp "${card}_tier3.png" "${card}.png"
    rm -f "${card}_tier1.png" "${card}_tier2.png" "${card}_tier3.png"
    echo "✓ ${card}.png (from tier3)"
  fi
done

echo ""
echo "Asset consolidation complete!"
echo "Remaining files:"
ls *.png 2>/dev/null | wc -l
