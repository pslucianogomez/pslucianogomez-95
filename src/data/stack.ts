export interface StackItem {
  name: string;
  years: number;
  core?: boolean;
}

export interface StackGroup {
  category: string;
  items: StackItem[];
}

export const stack: StackGroup[] = [
  {
    category: 'LANGUAGES',
    items: [
      { name: 'C#', years: 15, core: true },
      { name: 'TypeScript', years: 6 },
      { name: 'JavaScript', years: 12 },
      { name: 'SQL', years: 14 },
    ],
  },
  {
    category: 'FRAMEWORKS',
    items: [
      { name: '.NET', years: 15, core: true },
      { name: 'React', years: 6, core: true },
      { name: 'Entity Framework', years: 10 },
      { name: 'ASP.NET MVC', years: 12 },
    ],
  },
  {
    category: 'CLOUD',
    items: [
      { name: 'Azure', years: 8, core: true },
      { name: 'Azure DevOps', years: 6 },
    ],
  },
  {
    category: 'DATA',
    items: [
      { name: 'SQL Server', years: 14 },
      { name: 'PostgreSQL', years: 4 },
    ],
  },
  {
    category: 'TOOLS',
    items: [
      { name: 'Git', years: 12 },
      { name: 'Docker', years: 5 },
      { name: 'Vite', years: 2 },
    ],
  },
];
