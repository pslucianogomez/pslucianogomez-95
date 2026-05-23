export interface Experience {
  id: string;
  company: string;
  client?: string;
  location: string;
  period: { en: string; es: string };
  title: { en: string; es: string };
  abstract: { en: string; es: string };
  role: string;
  technologies: string[];
}

// Placeholder content — replace with real experiences before publishing.
export const experiences: Experience[] = [
  {
    id: 'argenway-2023',
    company: 'ARGENWAY',
    location: 'Córdoba, AR',
    period: { en: '2023 — Present', es: '2023 — Presente' },
    title: { en: 'Senior .NET Architect', es: 'Arquitecto Senior .NET' },
    abstract: {
      en: 'Led the migration to .NET 8 and rebuilt the core billing module.',
      es: 'Lideré la migración a .NET 8 y reescribí el módulo central de facturación.',
    },
    role: 'Architect / Tech Lead',
    technologies: ['.NET 8', 'C#', 'Azure', 'React', 'SQL Server'],
  },
];
