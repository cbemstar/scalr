# Restore point: Impeccable audit implementation (2026-04-29)

To **revert** the audited changes and restore the previous behaviour, copy these files back over the originals from the repo root:

```bash
cp .restore-points/impeccable-audit-2026-04-29/layout.tsx src/app/layout.tsx
cp .restore-points/impeccable-audit-2026-04-29/globals.css src/app/globals.css
cp .restore-points/impeccable-audit-2026-04-29/hero.tsx src/components/sections/hero.tsx
```

If you added `docs/DESIGN.md` with this work, remove it manually when rolling back:

```bash
rm -f docs/DESIGN.md
```

Then run `pnpm build` or `npm run build` to verify.
