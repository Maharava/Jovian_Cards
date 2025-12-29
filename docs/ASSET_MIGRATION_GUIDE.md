# Asset Migration Guide - Tier Removal Overhaul

This document provides a complete reference for renaming and reorganizing card assets during the tier removal overhaul. It serves as the single source of truth for which tier assets become primary and which become cosmetic variants.

**Last Updated:** Phase 0 - Documentation Update

---

## Migration Rules

### Rarity-Based Asset Selection:

| Rarity | Primary Asset | Cosmetic Variants |
|--------|--------------|-------------------|
| **Common** | Tier 1 → Remove `_tier1` suffix | T2 → `_alt1`, T3 → `_alt2` |
| **Uncommon** | Tier 1 → Remove `_tier1` suffix | T2 → `_alt1`, T3 → `_alt2` |
| **Rare** | Tier 2 → Remove `_tier2` suffix | T1 → `_alt1`, T3 → `_alt2` |
| **Legendary** | Tier 3 → Remove `_tier3` suffix | T1 → `_alt1`, T2 → `_alt2` |

### Folder Renaming:
- `public/assets/cards/jovian/` → `public/assets/cards/confederate/`
- `public/assets/cards/megacorp/` → *No change*
- `public/assets/cards/republic/` → *No change*

---

## Confederate Faction (formerly Jovian) - 20 Cards

**Source Folder:** `public/assets/cards/jovian/`
**Target Folder:** `public/assets/cards/confederate/`

### Common (7 cards) - Use Tier 1 as Primary

| Card Name | Current T1 Asset | Primary Asset | Alt 1 (from T2) | Alt 2 (from T3) |
|-----------|-----------------|---------------|-----------------|-----------------|
| Himalia | `himalia_tier1.png` | `himalia.png` | `himalia_alt1.png` | `himalia_alt2.png` |
| Amalthea | `amalthea_tier1.png` | `amalthea.png` | `amalthea_alt1.png` | `amalthea_alt2.png` |
| Leda | `leda_tier1.png` | `leda.png` | `leda_alt1.png` | `leda_alt2.png` |
| Lysithea | `lysithea_tier1.png` | `lysithea.png` | `lysithea_alt1.png` | `lysithea_alt2.png` |
| Kore | `kore_tier1.png` | `kore.png` | `kore_alt1.png` | `kore_alt2.png` |
| Adrastea | `adrastea_tier1.png` | `adrastea.png` | `adrastea_alt1.png` | `adrastea_alt2.png` |
| Carpo | `carpo_tier1.png` | `carpo.png` | `carpo_alt1.png` | `carpo_alt2.png` |

**Bash Commands:**
```bash
# Navigate to assets folder
cd public/assets/cards

# Rename folder
mv jovian confederate
cd confederate

# Common cards - Copy T1 as primary, T2/T3 as alts
cp himalia_tier1.png himalia.png
cp himalia_tier2.png himalia_alt1.png
cp himalia_tier3.png himalia_alt2.png

cp amalthea_tier1.png amalthea.png
cp amalthea_tier2.png amalthea_alt1.png
cp amalthea_tier3.png amalthea_alt2.png

cp leda_tier1.png leda.png
cp leda_tier2.png leda_alt1.png
cp leda_tier3.png leda_alt2.png

cp lysithea_tier1.png lysithea.png
cp lysithea_tier2.png lysithea_alt1.png
cp lysithea_tier3.png lysithea_alt2.png

cp kore_tier1.png kore.png
cp kore_tier2.png kore_alt1.png
cp kore_tier3.png kore_alt2.png

cp adrastea_tier1.png adrastea.png
cp adrastea_tier2.png adrastea_alt1.png
cp adrastea_tier3.png adrastea_alt2.png

cp carpo_tier1.png carpo.png
cp carpo_tier2.png carpo_alt1.png
cp carpo_tier3.png carpo_alt2.png
```

### Uncommon (5 cards) - Use Tier 1 as Primary

| Card Name | Current T1 Asset | Primary Asset | Alt 1 (from T2) | Alt 2 (from T3) |
|-----------|-----------------|---------------|-----------------|-----------------|
| Sinope | `sinope_tier1.png` | `sinope.png` | `sinope_alt1.png` | `sinope_alt2.png` |
| Euporie | `euporie_tier1.png` | `euporie.png` | `euporie_alt1.png` | `euporie_alt2.png` |
| Callisto | `callisto_tier1.png` | `callisto.png` | `callisto_alt1.png` | `callisto_alt2.png` |
| Taygete | `taygete_tier1.png` | `taygete.png` | `taygete_alt1.png` | `taygete_alt2.png` |
| Cyllene | `cyllene_tier1.png` | `cyllene.png` | `cyllene_alt1.png` | `cyllene_alt2.png` |

**Bash Commands:**
```bash
# Uncommon cards
cp sinope_tier1.png sinope.png
cp sinope_tier2.png sinope_alt1.png
cp sinope_tier3.png sinope_alt2.png

cp euporie_tier1.png euporie.png
cp euporie_tier2.png euporie_alt1.png
cp euporie_tier3.png euporie_alt2.png

cp callisto_tier1.png callisto.png
cp callisto_tier2.png callisto_alt1.png
cp callisto_tier3.png callisto_alt2.png

cp taygete_tier1.png taygete.png
cp taygete_tier2.png taygete_alt1.png
cp taygete_tier3.png taygete_alt2.png

cp cyllene_tier1.png cyllene.png
cp cyllene_tier2.png cyllene_alt1.png
cp cyllene_tier3.png cyllene_alt2.png
```

### Rare (5 cards) - Use Tier 2 as Primary

| Card Name | Current T2 Asset | Primary Asset | Alt 1 (from T1) | Alt 2 (from T3) |
|-----------|-----------------|---------------|-----------------|-----------------|
| Elara | `elara_tier2.png` | `elara.png` | `elara_alt1.png` | `elara_alt2.png` |
| Io | `io_tier2.png` | `io.png` | `io_alt1.png` | `io_alt2.png` |
| Pasiphae | `pasiphae_tier2.png` | `pasiphae.png` | `pasiphae_alt1.png` | `pasiphae_alt2.png` |
| Praxidike | `praxidike_tier2.png` | `praxidike.png` | `praxidike_alt1.png` | `praxidike_alt2.png` |
| Ganymede | `ganymede_tier2.png` | `ganymede.png` | `ganymede_alt1.png` | `ganymede_alt2.png` |

**Bash Commands:**
```bash
# Rare cards - Use T2 as primary
cp elara_tier2.png elara.png
cp elara_tier1.png elara_alt1.png
cp elara_tier3.png elara_alt2.png

cp io_tier2.png io.png
cp io_tier1.png io_alt1.png
cp io_tier3.png io_alt2.png

cp pasiphae_tier2.png pasiphae.png
cp pasiphae_tier1.png pasiphae_alt1.png
cp pasiphae_tier3.png pasiphae_alt2.png

cp praxidike_tier2.png praxidike.png
cp praxidike_tier1.png praxidike_alt1.png
cp praxidike_tier3.png praxidike_alt2.png

cp ganymede_tier2.png ganymede.png
cp ganymede_tier1.png ganymede_alt1.png
cp ganymede_tier3.png ganymede_alt2.png
```

### Legendary (3 cards) - Use Tier 3 as Primary

| Card Name | Current T3 Asset | Primary Asset | Alt 1 (from T1) | Alt 2 (from T2) |
|-----------|-----------------|---------------|-----------------|-----------------|
| Europa | `europa_tier3.png` | `europa.png` | `europa_alt1.png` | `europa_alt2.png` |
| Metis | `metis_tier3.png` | `metis.png` | `metis_alt1.png` | `metis_alt2.png` |
| Thebe | `thebe_tier3.png` | `thebe.png` | `thebe_alt1.png` | `thebe_alt2.png` |

**Bash Commands:**
```bash
# Legendary cards - Use T3 as primary
cp europa_tier3.png europa.png
cp europa_tier1.png europa_alt1.png
cp europa_tier2.png europa_alt2.png

cp metis_tier3.png metis.png
cp metis_tier1.png metis_alt1.png
cp metis_tier2.png metis_alt2.png

cp thebe_tier3.png thebe.png
cp thebe_tier1.png thebe_alt1.png
cp thebe_tier2.png thebe_alt2.png
```

---

## Megacorp Faction - 18 Cards

**Folder:** `public/assets/cards/megacorp/`

### Common (6 cards) - Use Tier 1 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Mining Drone | `mining_drone.png` | `mining_drone_alt1.png` | `mining_drone_alt2.png` |
| Security Bot | `security_bot.png` | `security_bot_alt1.png` | `security_bot_alt2.png` |
| Corp Guard | `corp_guard.png` | `corp_guard_alt1.png` | `corp_guard_alt2.png` |
| K9X Unit | `k9x_unit.png` | `k9x_unit_alt1.png` | `k9x_unit_alt2.png` |
| Loader | `loader.png` | `loader_alt1.png` | `loader_alt2.png` |
| Doc Ash | `doc_ash.png` | `doc_ash_alt1.png` | `doc_ash_alt2.png` |

### Uncommon (5 cards) - Use Tier 1 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Alexandrea | `alexandrea.png` | `alexandrea_alt1.png` | `alexandrea_alt2.png` |
| Ximena | `ximena.png` | `ximena_alt1.png` | `ximena_alt2.png` |
| Black Betty | `black_betty.png` | `black_betty_alt1.png` | `black_betty_alt2.png` |
| T4M3K0 | `t4m3k0.png` | `t4m3k0_alt1.png` | `t4m3k0_alt2.png` |
| Mr Harrison | `mr_harrison.png` | `mr_harrison_alt1.png` | `mr_harrison_alt2.png` |

### Rare (4 cards) - Use Tier 2 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Solarin Control | `solarin_control.png` | `solarin_control_alt1.png` | `solarin_control_alt2.png` |
| Director Kiz | `director_kiz.png` | `director_kiz_alt1.png` | `director_kiz_alt2.png` |
| Enforcer Lee | `enforcer_lee.png` | `enforcer_lee_alt1.png` | `enforcer_lee_alt2.png` |
| R0-VR | `r0_vr.png` | `r0_vr_alt1.png` | `r0_vr_alt2.png` |

### Legendary (3 cards) - Use Tier 3 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Director Vance | `director_vance.png` | `director_vance_alt1.png` | `director_vance_alt2.png` |
| The Auditor | `the_auditor.png` | `the_auditor_alt1.png` | `the_auditor_alt2.png` |
| Unit 734 | `unit_734.png` | `unit_734_alt1.png` | `unit_734_alt2.png` |

---

## Republic Faction - 18 Cards

**Folder:** `public/assets/cards/republic/`

### Common (7 cards) - Use Tier 1 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Torres | `torres.png` | `torres_alt1.png` | `torres_alt2.png` |
| Lira Chen | `lira_chen.png` | `lira_chen_alt1.png` | `lira_chen_alt2.png` |
| Protocol Droid | `protocol_droid.png` | `protocol_droid_alt1.png` | `protocol_droid_alt2.png` |
| James Park | `james_park.png` | `james_park_alt1.png` | `james_park_alt2.png` |
| Officer Volkov | `officer_volkov.png` | `officer_volkov_alt1.png` | `officer_volkov_alt2.png` |
| Advocate Cross | `advocate_cross.png` | `advocate_cross_alt1.png` | `advocate_cross_alt2.png` |
| Republic Drone | `republic_drone.png` | `republic_drone_alt1.png` | `republic_drone_alt2.png` |

### Uncommon (5 cards) - Use Tier 1 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Marcus Reeves | `marcus_reeves.png` | `marcus_reeves_alt1.png` | `marcus_reeves_alt2.png` |
| Elvie Webb | `elvie_webb.png` | `elvie_webb_alt1.png` | `elvie_webb_alt2.png` |
| Councilor Zhang | `councilor_zhang.png` | `councilor_zhang_alt1.png` | `councilor_zhang_alt2.png` |
| Dr. Singh | `dr_singh.png` | `dr_singh_alt1.png` | `dr_singh_alt2.png` |
| Chief Engineer Kozlov | `chief_engineer_kozlov.png` | `chief_engineer_kozlov_alt1.png` | `chief_engineer_kozlov_alt2.png` |

### Rare (4 cards) - Use Tier 2 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Commander Drake | `commander_drake.png` | `commander_drake_alt1.png` | `commander_drake_alt2.png` |
| Vera Frost | `vera_frost.png` | `vera_frost_alt1.png` | `vera_frost_alt2.png` |
| Senator Okoye | `senator_okoye.png` | `senator_okoye_alt1.png` | `senator_okoye_alt2.png` |
| Commander Voss | `commander_voss.png` | `commander_voss_alt1.png` | `commander_voss_alt2.png` |

### Legendary (2 cards) - Use Tier 3 as Primary

| Card Name | Primary Asset | Alt 1 | Alt 2 |
|-----------|---------------|-------|-------|
| Admiral Chen | `admiral_chen.png` | `admiral_chen_alt1.png` | `admiral_chen_alt2.png` |
| Captain Aria Kane | `captain_aria_kane.png` | `captain_aria_kane_alt1.png` | `captain_aria_kane_alt2.png` |

---

## Complete Migration Script

For automated migration, use this bash script:

```bash
#!/bin/bash
# Asset Migration Script for Tier Removal Overhaul

# Navigate to cards directory
cd public/assets/cards || exit

echo "Starting asset migration..."

# Rename jovian to confederate
echo "Renaming jovian folder to confederate..."
mv jovian confederate

# Confederate faction migration
cd confederate || exit
echo "Processing Confederate faction..."

# Arrays for each rarity
COMMON_CARDS=("himalia" "amalthea" "leda" "lysithea" "kore" "adrastea" "carpo")
UNCOMMON_CARDS=("sinope" "euporie" "callisto" "taygete" "cyllene")
RARE_CARDS=("elara" "io" "pasiphae" "praxidike" "ganymede")
LEGENDARY_CARDS=("europa" "metis" "thebe")

# Process Common/Uncommon (T1 as primary)
for card in "${COMMON_CARDS[@]}" "${UNCOMMON_CARDS[@]}"; do
  cp "${card}_tier1.png" "${card}.png"
  cp "${card}_tier2.png" "${card}_alt1.png"
  cp "${card}_tier3.png" "${card}_alt2.png"
  echo "Processed ${card}"
done

# Process Rare (T2 as primary)
for card in "${RARE_CARDS[@]}"; do
  cp "${card}_tier2.png" "${card}.png"
  cp "${card}_tier1.png" "${card}_alt1.png"
  cp "${card}_tier3.png" "${card}_alt2.png"
  echo "Processed ${card}"
done

# Process Legendary (T3 as primary)
for card in "${LEGENDARY_CARDS[@]}"; do
  cp "${card}_tier3.png" "${card}.png"
  cp "${card}_tier1.png" "${card}_alt1.png"
  cp "${card}_tier2.png" "${card}_alt2.png"
  echo "Processed ${card}"
done

cd .. # Back to cards/

# TODO: Add Megacorp and Republic processing similarly

echo "Asset migration complete!"
echo "Note: Old tier files (_tier1, _tier2, _tier3) are still present."
echo "Delete them manually after verifying new assets work correctly."
```

---

## Verification Checklist

After migration, verify:

- [ ] All primary assets load correctly in game
- [ ] Asset paths in code match new filenames
- [ ] Cosmetic variants are accessible (Phase 4)
- [ ] No broken image references
- [ ] Commander assets updated (if applicable)
- [ ] Old `_tierX` files can be safely deleted

---

## Notes

1. **Use `cp` instead of `mv`** during migration to preserve originals until verification
2. **Delete old `_tierX` files** only after confirming new assets work
3. **Test thoroughly** before deploying to production
4. **Backup assets folder** before running migration script
