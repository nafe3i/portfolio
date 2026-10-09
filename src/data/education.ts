import type { TranslationKey } from "./translations";

export interface EducationEntry {
  descriptionKey: TranslationKey;
  institutionKey: TranslationKey;
  locationKey: TranslationKey;
  periodKey: TranslationKey;
  programKey: TranslationKey;
}

export const educationEntries: EducationEntry[] = [
  {
    institutionKey: "education.youcode.institution",
    programKey: "education.youcode.program",
    periodKey: "education.youcode.period",
    locationKey: "education.youcode.location",
    descriptionKey: "education.youcode.description",
  },
  {
    institutionKey: "education.ista.institution",
    programKey: "education.ista.program",
    periodKey: "education.ista.period",
    locationKey: "education.ista.location",
    descriptionKey: "education.ista.description",
  },
  {
    institutionKey: "education.fpe.institution",
    programKey: "education.fpe.program",
    periodKey: "education.fpe.period",
    locationKey: "education.fpe.location",
    descriptionKey: "education.fpe.description",
  },
];
