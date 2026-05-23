export type StackLevel = 'advanced' | 'medium' | 'low';

export interface StackItem {
  name: string;
  level: StackLevel;
}

export interface StackGroup {
  category: string;
  items: StackItem[];
}

export const stack: StackGroup[] = [
  {
    category: 'LANGUAGES',
    items: [
      { name: 'C# / .NET',                level: 'advanced' },
      { name: 'VB .NET',                  level: 'advanced' },
      { name: 'JavaScript / jQuery',      level: 'advanced' },
      { name: 'TypeScript',               level: 'medium' },
      { name: 'React',                    level: 'advanced' },
      { name: 'Next.js',                  level: 'medium' },
      { name: 'Node.js',                  level: 'medium' },
      { name: 'HTML / CSS',               level: 'advanced' },
      { name: 'Java',                     level: 'medium' },
      { name: 'Python',                   level: 'low' },
      { name: 'C / C++',                  level: 'low' },
    ],
  },
  {
    category: 'DATABASES',
    items: [
      { name: 'SQL Server (2005-2022)',   level: 'advanced' },
      { name: 'MySQL',                    level: 'advanced' },
      { name: 'PostgreSQL',               level: 'advanced' },
      { name: 'Cosmos DB',                level: 'advanced' },
      { name: 'MongoDB',                  level: 'advanced' },
    ],
  },
  {
    category: 'MOBILE',
    items: [
      { name: 'Ionic (Cordova)',          level: 'medium' },
      { name: 'React Native',             level: 'medium' },
      { name: 'Xamarin',                  level: 'low' },
    ],
  },
  {
    category: 'TOOLS & PRACTICES',
    items: [
      { name: 'Git',                      level: 'advanced' },
      { name: 'Azure DevOps',             level: 'advanced' },
      { name: 'Jenkins',                  level: 'advanced' },
      { name: 'Jira',                     level: 'advanced' },
      { name: 'Confluence',               level: 'advanced' },
      { name: 'TFS',                      level: 'advanced' },
      { name: 'SVN',                      level: 'advanced' },
      { name: 'Swagger',                  level: 'advanced' },
      { name: 'Postman',                  level: 'advanced' },
      { name: 'Telerik',                  level: 'advanced' },
      { name: 'DevExpress',               level: 'advanced' },
      { name: 'Material UI',              level: 'advanced' },
      { name: 'Bootstrap',                level: 'advanced' },
      { name: 'Agile (Scrum / Kanban)',   level: 'advanced' },
      { name: 'Docker',                   level: 'medium' },
      { name: 'Kubernetes',               level: 'medium' },
      { name: 'SonarQube',                level: 'low' },
    ],
  },
];
