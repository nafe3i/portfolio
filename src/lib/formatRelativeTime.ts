import type { TranslationKey } from "@/data/translations";

type Translate = (key: TranslationKey) => string;

type RelativeUnit = "minute" | "hour" | "day" | "month" | "year";

interface TimeUnit {
  duration: number;
  unit: RelativeUnit;
}

const timeUnits: TimeUnit[] = [
  { unit: "year", duration: 365 * 24 * 60 * 60 * 1000 },
  { unit: "month", duration: 30 * 24 * 60 * 60 * 1000 },
  { unit: "day", duration: 24 * 60 * 60 * 1000 },
  { unit: "hour", duration: 60 * 60 * 1000 },
  { unit: "minute", duration: 60 * 1000 },
];

function getKey(unit: RelativeUnit, value: number): TranslationKey {
  return value === 1
    ? `projects.updated.${unit}`
    : `projects.updated.${unit}s`;
}

export function formatRelativeTime(pushedAt: string, t: Translate) {
  const elapsed = Math.max(0, Date.now() - Date.parse(pushedAt));

  for (const { duration, unit } of timeUnits) {
    const value = Math.floor(elapsed / duration);

    if (value >= 1) {
      return t(getKey(unit, value)).replace("{count}", String(value));
    }
  }

  return t("projects.updated.now");
}
